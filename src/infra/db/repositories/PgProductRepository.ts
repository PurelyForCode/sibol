import { Knex } from 'knex'
import { EntityId } from '../../../lib/domain/EntityId.js'
import { ProductRepository } from '../../../domain/product/repositories/ProductRepository.js'
import { ProductName } from '../../../domain/product/value_objects/ProductName.js'
import { Product } from '../../../domain/product/aggregates/Product.js'
import {
    ProductImageRow,
    ProductRow,
    ProductSellUnitRow,
} from '../tables/TableDefinitions.js'
import { ProductDescription } from '../../../domain/product/value_objects/ProductDescription.js'
import { ProductStock } from '../../../domain/product/value_objects/ProductStock.js'
import {
    UnitOfMeasurement,
    UnitOfMeasurementValues,
} from '../../../domain/shared/value_objects/UnitOfMeasurement.js'
import { Rating } from '../../../domain/shared/value_objects/Rating.js'
import { ProductStatus } from '../../../domain/product/value_objects/ProductStatus.js'
import { Money } from '../../../domain/shared/value_objects/Money.js'
import { UnitOfWork } from '../../../domain/shared/interfaces/UnitOfWork.js'
import { ProductSellUnit } from '../../../domain/product/entities/ProductSellUnit.js'
import { ConversionFactor } from '../../../domain/shared/value_objects/ConversionFactor.js'

export class PgProductRepository implements ProductRepository {
    constructor(
        private readonly k: Knex.Transaction,
        private readonly uow: UnitOfWork,
    ) {}

    snapshot() {}

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
        const productRow = await this.k<ProductRow>('products')
            .select('*')
            .where('id', id.value)
            .first()
        if (!productRow) {
            return null
        }
        const sellUnitRows = await this.k<ProductSellUnitRow>(
            'product_sell_units',
        )
            .select('unit', 'conversion_factor', 'id')
            .where('product_id', productRow.id)

        const imageRows = await this.k<ProductImageRow>('product_images')
            .select('url', 'position', 'id', 'created_at')
            .where('product_id', productRow.id)

        return this.map(productRow, sellUnitRows, imageRows)
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
        for (const [_, sellUnit] of product.sellUnits) {
            await this.k<ProductSellUnitRow>('product_sell_units')
                .insert({
                    conversion_factor: sellUnit.conversionFactor.value,
                    id: sellUnit.id.value,
                    product_id: sellUnit.productId.value,
                    unit: sellUnit.unit.value,
                })
                .onConflict('id')
                .merge()
        }
        this.uow.registerAggregate(product)
    }

    async delete(id: EntityId): Promise<void> {
        await this.k('products').delete().where('id', id.value)
    }

    private map(
        productRow: ProductRow,
        sellUnitRows: Omit<ProductSellUnitRow, 'product_id'>[],
        imageRows: Omit<ProductImageRow, 'product_id'>[],
    ): Product {
        const productId = EntityId.create(productRow.id)
        const sellerId = EntityId.create(productRow.seller_id)
        const name = ProductName.create(productRow.name).getValue()
        const description = productRow.description
            ? ProductDescription.create(productRow.description).getValue()
            : null
        const stock = ProductStock.create(productRow.stock_quantity).getValue()
        const baseUnit = UnitOfMeasurement.create(
            productRow.base_unit as UnitOfMeasurementValues,
        ).getValue()
        const pricePerUnit = Money.create(productRow.price_per_unit).getValue()
        const rating = productRow.rating
            ? Rating.create(productRow.rating)
            : null
        const status = ProductStatus.create(productRow.status).getValue()

        const sellUnits = new Map()
        for (const row of sellUnitRows) {
            const sellUnitId = EntityId.create(row.id)
            const sellUnitUnit = UnitOfMeasurement.create(row.unit).getValue()
            const conversionFactor = ConversionFactor.create(
                row.conversion_factor,
            ).getValue()

            const sellUnit = ProductSellUnit.rehydrate(
                sellUnitId,
                productId,
                sellUnitUnit,
                conversionFactor,
            )
            sellUnits.set(sellUnit.id.value, sellUnit)
        }

        return Product.rehydrate(
            productId,
            sellerId,
            name,
            description,
            stock,
            baseUnit,
            pricePerUnit,
            status,
            rating,
            new Map(),
            sellUnits,
            productRow.created_at,
            productRow.updated_at,
            productRow.deleted_at,
        )
    }
}
