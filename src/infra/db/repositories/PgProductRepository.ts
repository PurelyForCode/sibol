import { Knex } from 'knex'
import { EntityId } from '../../../lib/domain/EntityId.js'
import { ProductRepository } from '../../../domain/product/repositories/ProductRepository.js'
import { ProductName } from '../../../domain/product/value_objects/ProductName.js'
import { Product } from '../../../domain/product/aggregates/Product.js'
import { ProductRow } from '../tables/TableDefinitions.js'
import { ProductDescription } from '../../../domain/product/value_objects/ProductDescription.js'
import { ProductStock } from '../../../domain/product/value_objects/ProductStock.js'
import { UnitOfMeasurement } from '../../../domain/shared/value_objects/UnitOfMeasurement.js'
import { Rating } from '../../../domain/shared/value_objects/Rating.js'
import { ProductStatus } from '../../../domain/product/value_objects/ProductStatus.js'
import { Money } from '../../../domain/shared/value_objects/Money.js'
import { UnitOfWork } from '../../../domain/shared/interfaces/UnitOfWork.js'

export class PgProductRepository implements ProductRepository {
    constructor(
        private readonly k: Knex.Transaction,
        private readonly uow: UnitOfWork,
    ) {}

    async existsByNameAndSellerId(
        name: ProductName,
        sellerId: EntityId,
    ): Promise<boolean> {
        const row = await this.k('products')
            .select(1)
            .where('name', name.value)
            .where('seller_id', sellerId.value)
            .first()
        return !!row
    }

    async findById(id: EntityId): Promise<Product | null> {
        const row = await this.k<ProductRow>('products')
            .select('*')
            .where('id', id.value)
            .first()
        if (!row) {
            return null
        }
        return this.map(row)
    }

    async existsById(id: EntityId): Promise<boolean> {
        const row = await this.k('products')
            .select(1)
            .where('id', id.value)
            .first()
        return !!row
    }

    async save(product: Product): Promise<void> {
        await this.k<ProductRow>('products')
            .insert({
                id: product.id.value,
                name: product.name.value,
                rating: product.rating ? product.rating.value : null,
                base_unit: product.baseUnit.value,
                seller_id: product.sellerId.value,
                created_at: product.createdAt,
                status: product.status.value,
                stock_quantity: product.stock.value,
                description: product.description
                    ? product.description.value
                    : null,
                deleted_at: product.deletedAt ? product.deletedAt : null,
                updated_at: product.updatedAt,
            })
            .onConflict('id')
            .merge()
        this.uow.registerAggregate(product)
    }

    async delete(id: EntityId): Promise<void> {
        await this.k('products').delete().where('id', id.value)
    }

    private map(row: ProductRow): Product {
        const id = EntityId.create(row.id)
        const sellerId = EntityId.create(row.seller_id)
        const name = ProductName.create(row.name)
        const description = row.description
            ? ProductDescription.create(row.description).getValue()
            : null
        const stock = ProductStock.create(row.stock_quantity).getValue()
        const baseUnit = UnitOfMeasurement.create(row.base_unit).getValue()
        const pricePerUnit = Money.create(row.price_per_unit).getValue()
        const rating = row.rating ? Rating.create(row.rating) : null
        const status = ProductStatus.create(row.status).getValue()

        return Product.rehydrate(
            id,
            sellerId,
            name,
            description,
            stock,
            baseUnit,
            pricePerUnit,
            status,
            rating,
            [],
            [],
            row.created_at,
            row.updated_at,
            row.deleted_at,
        )
    }
}
