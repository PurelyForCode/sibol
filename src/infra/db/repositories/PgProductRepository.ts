import { Knex } from 'knex'
import { ProductRepository } from '../../../domain/product/repositories/ProductRepository.js'
import { ProductName } from '../../../domain/product/value_objects/ProductName.js'
import { Product } from '../../../domain/product/aggregates/Product.js'
import {
    ProductImageRow,
    ProductInventoryRow,
    ProductRow,
    SellUnitRow,
} from '../tables/TableDefinitions.js'
import { ProductDescription } from '../../../domain/product/value_objects/ProductDescription.js'
import { ProductStock } from '../../../domain/product/value_objects/ProductStock.js'
import { UnitOfMeasurement } from '../../../domain/shared/value_objects/UnitOfMeasurement.js'
import { Rating } from '../../../domain/shared/value_objects/Rating.js'
import { ProductStatus } from '../../../domain/product/value_objects/ProductStatus.js'
import { Money } from '../../../domain/shared/value_objects/Money.js'
import { UnitOfWork } from '../../../domain/shared/interfaces/UnitOfWork.js'
import { ProductSellUnit } from '../../../domain/product/entities/ProductSellUnit.js'
import { ConversionFactor } from '../../../domain/shared/value_objects/ConversionFactor.js'
import { SellUnitDisplayName } from '../../../domain/product/value_objects/SellUnitDisplayName.js'
import { SmallestUnitOfMeasurement } from '../../../domain/shared/value_objects/SmallestUnitOfMeasurement.js'
import { PgBaseRepository } from './PgBaseRepository.js'
import { EntityId, Id } from '../../../domain/shared/EntityId.js'

export class PgProductRepository
    extends PgBaseRepository<Product>
    implements ProductRepository
{
    constructor(
        private readonly k: Knex.Transaction,
        private readonly uow: UnitOfWork,
    ) {
        super()
    }

    async findProducts(ids: EntityId[]): Promise<Map<Id, Product>> {
        const productRows = (await this.k<
            ProductRow &
                Pick<ProductInventoryRow, 'available_stock' | 'reserved_stock'>
        >('products')
            .select(
                'products.*',
                'product_inventory.available_stock',
                'product_inventory.reserved_stock',
            )
            .leftJoin(
                'product_inventory',
                'products.id',
                'product_inventory.product_id',
            )
            .whereIn(
                'id',
                ids.map(x => x.value),
            )) as (ProductRow &
            Pick<ProductInventoryRow, 'available_stock' | 'reserved_stock'>)[]

        const products = new Map()
        for (const row of productRows) {
            const sellUnitRows = await this.k<SellUnitRow>('sell_units').where(
                'product_id',
                row.id,
            )

            const imageRows = await this.k<ProductImageRow>(
                'product_images',
            ).where('product_id', row.id)

            const product = this.map(row, sellUnitRows, imageRows)
            this.snapshot(product)
            products.set(product.id.value, product)
        }
        return products
    }

    async isNameUniqueWithinSellerStore(
        name: ProductName,
        sellerId: EntityId,
    ): Promise<boolean> {
        const row = await this.k('products')
            .select(1)
            .where('name', name.value)
            .where('seller_id', sellerId.value)
            .first()
        if (row) {
            return false
        } else {
            return true
        }
    }

    async findById(id: EntityId): Promise<Product | null> {
        const productRow = await this.k<
            ProductRow &
                Pick<ProductInventoryRow, 'available_stock' | 'reserved_stock'>
        >('products')
            .select(
                'products.*',
                'product_inventory.available_stock',
                'product_inventory.reserved_stock',
            )
            .leftJoin(
                'product_inventory',
                'products.id',
                'product_inventory.product_id',
            )
            .where('products.id', id.value)
            .first()
        if (!productRow) {
            return null
        }

        const sellUnitRows = await this.k<SellUnitRow>('sell_units').where(
            'product_id',
            productRow.id,
        )

        const imageRows = await this.k<ProductImageRow>('product_images').where(
            'product_id',
            productRow.id,
        )

        const product = this.map(productRow, sellUnitRows, imageRows)
        this.snapshot(product)
        return product
    }

    async existsById(id: EntityId): Promise<boolean> {
        const row = await this.k('products')
            .select(1)
            .where('id', id.value)
            .first()
        return !!row
    }

    async save(product: Product): Promise<void> {
        const snapshot = this.getSnapshot(product.id)
        if (snapshot) {
            const deletedSellUnits = this.getDeletedIds(
                snapshot.sellUnits,
                product.sellUnits,
            )
            await this.k('sell_units').delete().whereIn('id', deletedSellUnits)
        }

        await this.k<ProductRow>('products')
            .insert({
                id: product.id.value,
                name: product.name.value,
                rating: product.rating ? product.rating.value : null,
                seller_id: product.sellerId.value,
                created_at: product.createdAt,
                status: product.status.value,
                description: product.description
                    ? product.description.value
                    : null,
                deleted_at: product.deletedAt ? product.deletedAt : null,
                updated_at: product.updatedAt,
                inventory_unit_symbol: product.inventoryUnitSymbol.value,
            })
            .onConflict('id')
            .merge()

        for (const [_, sellUnit] of product.sellUnits) {
            await this.k<SellUnitRow>('sell_units')
                .insert({
                    conversion_factor: sellUnit.conversionFactor.value,
                    id: sellUnit.id.value,
                    product_id: sellUnit.productId.value,
                    unit_symbol: sellUnit.unitSymbol.value,
                    display_name: sellUnit.displayName.value,
                    price_per_unit: sellUnit.pricePerUnit.value,
                    discontinued_at: sellUnit.discontinuedAt,
                })
                .onConflict('id')
                .merge()
        }

        await this.k<ProductInventoryRow>('product_inventory')
            .insert({
                product_id: product.id.value,
                updated_at: new Date(),
                available_stock: product.availableStock.value,
                reserved_stock: product.reservedStock.value,
            })
            .onConflict('product_id')
            .merge()

        this.uow.registerAggregate(product)
    }

    async delete(id: EntityId): Promise<void> {
        await this.k('products').delete().where('id', id.value)
    }

    private map(
        productRow: ProductRow &
            Pick<ProductInventoryRow, 'available_stock' | 'reserved_stock'>,
        sellUnitRows: Omit<SellUnitRow, 'product_id'>[],
        _imageRows: Omit<ProductImageRow, 'product_id'>[],
    ): Product {
        const productId = EntityId.create(productRow.id)

        const sellUnits = new Map()
        for (const row of sellUnitRows) {
            const sellUnitId = EntityId.create(row.id)
            const conversionFactor = ConversionFactor.create(
                row.conversion_factor,
            ).getValue()
            const unitSymbol = UnitOfMeasurement.create(
                row.unit_symbol,
            ).getValue()
            const pricePerUnit = Money.create(row.price_per_unit).getValue()
            const displayName = SellUnitDisplayName.create(
                row.display_name,
            ).getValue()

            const sellUnit = ProductSellUnit.rehydrate(
                sellUnitId,
                productId,
                unitSymbol,
                conversionFactor,
                pricePerUnit,
                displayName,
                row.discontinued_at,
            )
            sellUnits.set(sellUnit.id.value, sellUnit)
        }

        const sellerId = EntityId.create(productRow.seller_id)
        const name = ProductName.create(productRow.name).getValue()
        const description = productRow.description
            ? ProductDescription.create(productRow.description).getValue()
            : null
        const rating = productRow.rating
            ? Rating.create(productRow.rating)
            : null
        const status = ProductStatus.create(productRow.status).getValue()
        const availableStock = ProductStock.create(
            productRow.available_stock,
        ).getValue()
        const reservedStock = ProductStock.create(
            productRow.reserved_stock,
        ).getValue()

        const smallestUnitOfMeasurement = SmallestUnitOfMeasurement.create(
            productRow.inventory_unit_symbol,
        ).getValue()

        return Product.rehydrate(
            productId,
            sellerId,
            name,
            description,
            smallestUnitOfMeasurement,
            status,
            rating,
            new Map(),
            sellUnits,
            availableStock,
            reservedStock,
            productRow.created_at,
            productRow.updated_at,
            productRow.deleted_at,
        )
    }
}
