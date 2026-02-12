import { Knex } from 'knex'
import { EntityId } from '../../../../lib/EntityId.js'
import { Product } from '../../domain/entities/product/Product.js'
import {
    ProductRepository,
    ProductRepositoryFactory,
} from '../../domain/repositories/ProductRepository.js'
import { ProductName } from '../../domain/entities/product/ProductName.js'
import { ProductStock } from '../../domain/entities/product/ProductStock.js'
import {
    UnitOfMeasure,
    UnitOfMeasurement,
} from '../../domain/entities/product/UnitOfMeasurement.js'
import { Money } from '../../domain/entities/product/Money.js'
import { ProductDescription } from '../../domain/entities/product/ProductDescription.js'
import { Rating } from '../../../shared/value_objects/Rating.js'
import { ProductRow } from '../../../../lib/database_tables/ProductRow.js'

export class PgProductRepositoryFactory implements ProductRepositoryFactory {
    create(trx: Knex.Transaction): PgProductRepository {
        return new PgProductRepository(trx)
    }
}

export class PgProductRepository implements ProductRepository {
    constructor(private readonly k: Knex.Transaction) {}

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
                price_per_unit: product.pricePerUnit.amount,
                seller_id: product.sellerId.value,
                stock: product.stock.value,
                unit_of_measure: product.unit.unit,
                unit_value: product.unit.value,
                description: product.description
                    ? product.description.value
                    : null,
                deleted_at: product.deletedAt ? product.deletedAt : null,
            })
            .onConflict('id')
            .merge({
                name: product.name.value,
                rating: product.rating ? product.rating.value : null,
                price_per_unit: product.pricePerUnit.amount,
                seller_id: product.sellerId.value,
                stock: product.stock.value,
                unit_of_measure: product.unit.unit,
                unit_value: product.unit.value,
                description: product.description
                    ? product.description.value
                    : null,
                deleted_at: product.deletedAt ? product.deletedAt : null,
            })
    }

    async delete(id: EntityId): Promise<void> {
        await this.k('products').delete().where('id', id.value)
    }

    private map(row: ProductRow): Product {
        const id = EntityId.create(row.id)
        const sellerId = EntityId.create(row.seller_id)
        const name = ProductName.create(row.name)
        const description = row.description
            ? ProductDescription.create(row.description)
            : null
        const stock = ProductStock.create(row.stock)
        const unit = UnitOfMeasurement.create(
            UnitOfMeasure[row.unit_of_measure as keyof typeof UnitOfMeasure],
            row.unit_value,
        )
        const pricePerUnit = Money.create(row.price_per_unit)
        const rating = row.rating ? Rating.create(row.rating) : null

        return Product.rehydrate(
            id,
            sellerId,
            name,
            description,
            stock,
            unit,
            pricePerUnit,
            rating,
            row.created_at,
            row.updated_at,
            row.deleted_at,
        )
    }
}
