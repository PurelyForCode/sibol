import { Knex } from 'knex'
import { EntityId } from '../../../../lib/EntityId.js'
import { Repository } from '../../../../lib/interfaces/Repository.js'
import { Buyer } from '../../domain/entities/buyer/Buyer.js'
import {
    BuyerRepository,
    BuyerRepositoryFactory,
} from '../../domain/repositories/BuyerRepository.js'
import { BuyerRow } from '../../../../lib/database_tables/BuyerRow.js'
import { BuyerUserRow } from '../../../../lib/database_tables/BuyerUserRow.js'
import { Email } from '../../domain/entities/Email.js'
import { Username } from '../../domain/entities/Username.js'
import { TotalOrders } from '../../domain/entities/buyer/TotalOrders.js'
import { UserRow } from '../../../../lib/database_tables/UserRow.js'
import { UserCredential } from '../../domain/entities/UserCredential.js'

export class PgBuyerRepositoryFactory implements BuyerRepositoryFactory {
    create(props: any): Repository<any, any> {
        throw new Error('Method not implemented.')
    }
}

export class PgBuyerRepository implements BuyerRepository {
    constructor(private readonly k: Knex.Transaction) {}

    async findById(id: EntityId): Promise<Buyer | null> {
        const row = await this.k<BuyerUserRow>('users as u')
            .select(
                'u.id',
                'u.email',
                'u.updated_at',
                'u.created_at',
                's.store_name',
                's.rating',
                's.total_sales',
            )
            .leftJoin('sellers as s', 'u.id', 's.id')
            .where('id', id.value)
            .first()
        if (!row) {
            return null
        }
        return this.map(row)
    }

    async existsById(id: EntityId): Promise<boolean> {
        const exists = await this.k('buyers')
            .select(1)
            .where('id', id.value)
            .first()
        return !!exists
    }

    async save(entity: Buyer): Promise<void> {
        entity.
            await this.k<UserRow>('buyers').insert(
        )
    }

    async register(input: {
        buyer: Buyer
        credentials: UserCredential
    }): Promise<void> {
        await this.k<UserRow>('users').insert({
            id: input.buyer.id.value,
            email: input.buyer.email.value,
            password_hash: input.credentials.passwordHash.value,
            created_at: input.buyer.createdAt,
            updated_at: input.buyer.updatedAt,
            banned_at: input.buyer.bannedAt,
        })

        await this.k<BuyerRow>('buyers').insert({
            id: input.buyer.id.value,
            is_verified: input.buyer.isVerified,
            total_orders: input.buyer.totalOrders.value,
            username: input.buyer.username.value,
        })
    }

    async delete(id: EntityId): Promise<void> {
        await this.k<UserRow>('users').delete().where('id', id.value)
    }

    private map(row: BuyerUserRow): Buyer {
        const id = EntityId.create(row.id)
        const email = Email.create(row.email)
        const username = Username.create(row.username)
        const totalOrders = TotalOrders.create(row.total_orders)

        return Buyer.create(
            id,
            email.value,
            username.value,
            row.is_verified,
            totalOrders.value,
            row.banned_at,
            row.created_at,
            row.updated_at,
        )
    }
}
