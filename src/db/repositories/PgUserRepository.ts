import { Knex } from 'knex'
import { Id } from '../../core/interfaces/IdGenerator.js'
import { UserRepository } from '../../domain/repositories/UserRepository.js'
import { BuyerRow, UserRow } from '../tables/RowDefinitions.js'
import { User } from '../../domain/model/user/User.js'

export class PgUserRepository implements UserRepository {
    constructor(private readonly knex: Knex.Transaction) {}

    async insert(model: User): Promise<void> {
        const now = new Date()
        await this.knex<UserRow>('users').insert({
            banned_at: null,
            created_at: now,
            email: model.email,
            id: model.id,
            password_hash: model.passwordHash,
            updated_at: now,
        })
    }

    async sellerExistsByEmail(email: string): Promise<boolean> {
        const row = await this.knex<BuyerRow>('sellers as s')
            .join<UserRow>('users as u', 'u.id', 's.id')
            .select(this.knex.raw('1'))
            .where('u.email', email)
            .first()

        return !!row
    }

    async buyerExistsByEmail(email: string): Promise<boolean> {
        const row = await this.knex<BuyerRow>('buyers as b')
            .join<UserRow>('users as u', 'u.id', 'b.id')
            .select(this.knex.raw('1'))
            .where('u.email', email)
            .first()

        return !!row
    }

    update(model: User): Promise<void> {
        throw new Error('Method not implemented.')
    }
    delete(modelId: Id): Promise<void> {
        throw new Error('Method not implemented.')
    }
    findById(id: Id): Promise<User | null> {
        throw new Error('Method not implemented.')
    }
    existsById(id: Id): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
}
