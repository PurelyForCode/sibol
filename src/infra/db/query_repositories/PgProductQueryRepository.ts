import { Knex } from 'knex'
import { EntityId } from '../../../domain/shared/EntityId.js'
import { ProductDto } from '../../../features/dto/ProductDto.js'
import { ProductInventoryRow, ProductRow } from '../tables/TableDefinitions.js'
import { InternalServerError } from '../../../exceptions/shared/InternalServerError.js'

export class PgProductQueryRepository {
    constructor(private readonly k: Knex | Knex.Transaction) {}

    async findById(id: EntityId): Promise<ProductDto | null> {
        const product = await this.k<ProductRow>('products')
            .select('*')
            .where('id', id.value)
            .first()
        if (!product) {
            return null
        }
        const inventoryRow = await this.k<ProductInventoryRow>(
            'product_inventory',
        )
            .where('product_id', product.id)
            .first()
        if (!inventoryRow) {
            throw new InternalServerError('Product has no inventory row')
        }
        return this.map(product, inventoryRow)
    }

    async findAll(params?: {
        filter?: unknown
        pagination?: { page?: number; limit?: number }
    }): Promise<readonly ProductDto[]> {
        const products = await this.k<ProductRow>('products').select('*')
        const results: ProductDto[] = []

        for (const product of products) {
            const inventoryRow = await this.k<ProductInventoryRow>(
                'product_inventory',
            )
                .where('product_id', product.id)
                .first()
            if (!inventoryRow) {
                throw new InternalServerError('Product has no inventory row')
            }
            results.push(this.map(product, inventoryRow))
        }
        return results
    }

    private map(row: ProductRow, invRow: ProductInventoryRow): ProductDto {
        return {
            id: row.id,
            sellerId: row.seller_id,
            name: row.name,
            description: row.description,
            rating: row.rating,
            status: row.status,
            inventoryUnitSymbol: row.inventory_unit_symbol,
            availableStock: invRow.available_stock,
            reservedStock: invRow.reserved_stock,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            deletedAt: row.deleted_at,
        }
    }
}
