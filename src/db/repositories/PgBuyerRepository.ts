import { Knex } from 'knex'
import { Id } from '../../core/interfaces/IdGenerator.js'
import { Buyer } from '../../domain/model/buyer/Buyer.js'
import { BuyerRepository } from '../../domain/repositories/BuyerRepository.js'
import { BuyerRow } from '../tables/RowDefinitions.js'

export class PgBuyerRepository implements BuyerRepository {
    constructor(private readonly knex: Knex.Transaction) {}

    async findByUsername(username: string): Promise<Buyer | null> {
        const row = await this.knex<BuyerRow>('buyers')
            .where('username', username)
            .first()

        if (!row) {
            return null
        }

        return this.map(row)
    }

    async insert(model: Buyer): Promise<void> {
        await this.knex<BuyerRow>('buyers').insert({
            created_at: model.createdAt,
            id: model.id,
            is_active: model.isActive,
            is_verified: model.isVerified,
            updated_at: model.updatedAt,
            username: model.username,
        })
    }

    async update(model: Buyer): Promise<void> {
        await this.knex<BuyerRow>('buyers')
            .update({
                created_at: model.createdAt,
                id: model.id,
                is_active: model.isActive,
                is_verified: model.isVerified,
                updated_at: model.updatedAt,
                username: model.username,
            })
            .where('id', model.id)
    }

    async delete(modelId: Id): Promise<void> {
        await this.knex<BuyerRow>('buyers').delete().where('id', modelId)
    }

    async findById(id: Id): Promise<Buyer | null> {
        const row = await this.knex<BuyerRow>('buyers').where('id', id).first()

        if (!row) {
            return null
        }

        return this.map(row)
    }

    async existsById(id: Id): Promise<boolean> {
        const row = await this.knex<BuyerRow>('buyers').where('id', id).first()

        return !!row
    }

    private map(row: BuyerRow): Buyer {
        return Buyer.rehydrate(
            row.id,
            row.username,
            row.is_verified,
            row.is_active,
            row.created_at,
            row.updated_at,
        )
    }
}
