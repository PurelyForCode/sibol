import { Knex } from 'knex'
import { Id } from '../../core/interfaces/IdGenerator.js'
import { ProductRepository } from '../../domain/repositories/ProductRepository.js'
import { Product } from '../../domain/model/product/Product.js'
import { ProductRow } from '../tables/RowDefinitions.js'

export class PgProductRepository implements ProductRepository {
    constructor(private readonly knex: Knex.Transaction) {}

    async productExistsByNameAndSellerId(
        name: string,
        sellerId: string,
    ): Promise<boolean> {
        const row = await this.knex<ProductRow>('products')
            .where('seller_id', sellerId)
            .where('name', name)
            .first()
        return !!row
    }

    async insert(model: Product): Promise<void> {
        await this.knex<ProductRow>('products').insert({
            base_unit: model.baseUnit,
            created_at: model.createdAt,
            deleted_at: model.deletedAt,
            description: model.description,
            id: model.id,
            name: model.name,
            rating: model.rating,
            seller_id: model.sellerId,
            status: model.status,
            stock_quantity: model.stockQuantity,
            updated_at: model.updatedAt,
        })
    }

    async update(model: Product): Promise<void> {
        await this.knex<ProductRow>('products')
            .update({
                base_unit: model.baseUnit,
                created_at: model.createdAt,
                deleted_at: model.deletedAt,
                description: model.description,
                id: model.id,
                name: model.name,
                rating: model.rating,
                seller_id: model.sellerId,
                status: model.status,
                stock_quantity: model.stockQuantity,
                updated_at: model.updatedAt,
            })
            .where('id', model.id)
    }

    async delete(modelId: Id): Promise<void> {
        await this.knex('products').delete().where('id', modelId)
    }

    async findById(id: Id): Promise<Product | null> {
        const row = await this.knex<ProductRow>('products')
            .where('id', id)
            .first()
        if (!row) {
            return null
        }
        return this.map(row)
    }

    async existsById(id: Id): Promise<boolean> {
        const row = await this.knex<ProductRow>('products')
            .where('id', id)
            .first()
        return !!row
    }

    private map(row: ProductRow): Product {
        return Product.rehydrate(
            row.id,
            row.seller_id,
            row.name,
            row.description,
            row.stock_quantity,
            row.base_unit,
            row.rating,
            row.status,
            row.created_at,
            row.updated_at,
            row.deleted_at,
        )
    }
}
