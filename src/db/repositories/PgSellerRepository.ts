import { Knex } from 'knex'
import { Id } from '../../core/interfaces/IdGenerator.js'
import { SellerRepository } from '../../domain/repositories/SellerRepository.js'
import { Seller } from '../../domain/model/seller/Seller.js'
import { SellerRow } from '../tables/RowDefinitions.js'

export class PgSellerRepository implements SellerRepository {
    constructor(private readonly knex: Knex.Transaction) {}

    async findByStoreName(storeName: string): Promise<Seller | null> {
        const row = await this.knex<SellerRow>('sellers')
            .where('store_name', storeName)
            .first()

        if (!row) {
            return null
        }

        return this.map(row)
    }
    async findByStoreSlug(slug: string): Promise<Seller | null> {
        const row = await this.knex<SellerRow>('sellers')
            .where('store_slug', slug)
            .first()

        if (!row) {
            return null
        }

        return this.map(row)
    }

    async insert(model: Seller): Promise<void> {
        const row = await this.knex<SellerRow>('sellers').insert({
            created_at: model.createdAt,
            description: model.description,
            id: model.id,
            is_active: model.isActive,
            is_verified: model.isVerified,
            rating: model.rating,
            store_name: model.storeName,
            store_slug: model.storeSlug,
            support_email: model.supportEmail,
            support_phone: model.supportPhone,
            total_sales: model.totalSales,
            updated_at: model.updatedAt,
        })
    }
    async update(model: Seller): Promise<void> {
        const row = await this.knex<SellerRow>('sellers')
            .update({
                created_at: model.createdAt,
                description: model.description,
                id: model.id,
                is_active: model.isActive,
                is_verified: model.isVerified,
                rating: model.rating,
                store_name: model.storeName,
                store_slug: model.storeSlug,
                support_email: model.supportEmail,
                support_phone: model.supportPhone,
                total_sales: model.totalSales,
                updated_at: model.updatedAt,
            })
            .where('id', model.id)
    }
    async delete(modelId: Id): Promise<void> {
        await this.knex('sellers').delete().where('id', modelId)
    }

    async findById(id: Id): Promise<Seller | null> {
        const row = await this.knex('sellers').where('id', id).first()
        if (!row) {
            return null
        }
        return this.map(row)
    }

    async existsById(id: Id): Promise<boolean> {
        const row = await this.knex('sellers').where('id', id).first()
        return !!row
    }

    private map(row: SellerRow): Seller {
        return Seller.rehydrate(
            row.id,
            row.store_name,
            row.store_slug,
            row.description,
            row.rating,
            row.total_sales,
            row.is_verified,
            row.is_active,
            row.support_email,
            row.support_phone,
            row.created_at,
            row.updated_at,
        )
    }
}
