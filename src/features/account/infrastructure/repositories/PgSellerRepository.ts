import { Knex } from 'knex'
import { EntityId } from '../../../../lib/EntityId.js'
import {
    SellerRepository,
    SellerRepositoryFactory,
} from '../../domain/repositories/SellerRepository.js'
import { Seller } from '../../domain/entities/seller/Seller.js'

export class PgSellerRepositoryFactory implements SellerRepositoryFactory {
    create(trx: Knex.Transaction): PgSellerRepository {
        return new PgSellerRepository(trx)
    }
}

export type SellerRow = {
    id: string
    email: string
    password: string
    role: string
    storeName: string
    rating: number
    totalSales: number
}

export class PgSellerRepository implements SellerRepository {
    constructor(private readonly k: Knex.Transaction) {}

    async findById(id: EntityId): Promise<Seller | null> {
        const row = await this.k<SellerRow>('users')
            .where('id', id.value)
            .where('user_type', 'seller')
            .first()
        if (!row) {
            return null
        }
        return this.map(row)
    }
    async existsById(id: EntityId): Promise<boolean> {
        // const row = await this.k('sellers').where('id', id.value).first()
        // return !!row
        return true
    }
    async save(T: Seller): Promise<void> {
        throw new Error('Method not implemented.')
    }
    async delete(id: EntityId): Promise<void> {
        throw new Error('Method not implemented.')
    }
    private map(row: SellerRow): Seller {
        Seller
    }
}
