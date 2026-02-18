import { Knex } from 'knex'
import { EntityId } from '../../../lib/domain/EntityId.js'
import { Buyer } from '../../../domain/buyer/aggregates/Buyer.js'
import { BuyerRepository } from '../../../domain/buyer/repositories/BuyerRepository.js'
import { BuyerRow } from '../tables/TableDefinitions.js'
import { Username } from '../../../domain/shared/value_objects/Username.js'
import { Email } from '../../../domain/shared/value_objects/Email.js'

export class PgBuyerRepository implements BuyerRepository {
    constructor(private readonly k: Knex.Transaction) {}

    async findByEmail(email: Email): Promise<Buyer | null> {
        const row = await this.k<BuyerRow>('buyers')
            .where('email', email.value)
            .first()
        if (!row) {
            return null
        }
        return this.map(row)
    }
    async findByUsername(username: Username): Promise<Buyer | null> {
        const row = await this.k<BuyerRow>('buyers')
            .where('username', username.value)
            .first()
        if (!row) {
            return null
        }
        return this.map(row)
    }
    async existsByUsername(username: Username): Promise<boolean> {
        const row = await this.k<BuyerRow>('buyers')
            .where('username', username.value)
            .first()
        return !!row
    }
    async existsByEmail(email: Email): Promise<boolean> {
        const row = await this.k<BuyerRow>('buyers')
            .where('email', email.value)
            .first()
        return !!row
    }

    async findById(id: EntityId): Promise<Buyer | null> {
        const row = await this.k<BuyerRow>('buyers')
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
        await this.k<BuyerRow>('buyers')
            .insert({
                created_at: entity.createdAt,
                id: entity.id.value,
                is_active: entity.isActive,
                is_verified: entity.isVerified,
                updated_at: entity.updatedAt,
                username: entity.username.value,
            })
            .onConflict('id')
            .merge()
    }

    async delete(id: EntityId): Promise<void> {
        await this.k<BuyerRow>('accounts').delete().where('id', id.value)
    }

    private map(row: BuyerRow): Buyer {
        const id = EntityId.create(row.id)
        const username = Username.create(row.username)

        return Buyer.rehydrate(
            id,
            username.getValue(),
            row.is_verified,
            row.is_active,
            row.created_at,
            row.updated_at,
        )
    }
}
