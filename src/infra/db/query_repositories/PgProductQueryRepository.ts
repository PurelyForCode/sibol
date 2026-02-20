import { Knex } from 'knex'
import { EntityId } from '../../../lib/domain/EntityId.js'
import { ProductDto } from '../../../features/dto/ProductDto.js'
import { ProductRow } from '../tables/TableDefinitions.js'

export class PgProductQueryRepository {
    constructor(private readonly k: Knex) {}

    async findById(id: EntityId): Promise<ProductDto | null> {
        const product = await this.k<ProductRow>('products')
            .select('*')
            .where('id', id.value)
            .first()
        if (!product) {
            return null
        }
        return this.map(product)
    }

    async findAll(params?: {
        filter?: unknown
        pagination?: { page?: number; limit?: number }
    }): Promise<readonly ProductDto[]> {
        const products = await this.k<ProductRow>('products').select('*')
        const results: ProductDto[] = []
        for (const product of products) {
            results.push(this.map(product))
        }
        return results
    }

    private map(row: ProductRow): ProductDto {
        return {
            createdAt: row.created_at,
            deletedAt: row.deleted_at,
            description: row.description,
            id: row.id,
            name: row.name,
            pricePerUnit: row.price_per_unit,
            rating: row.rating,
            sellerId: row.seller_id,
            stockQuantity: row.stock_quantity,
            baseUnit: row.base_unit,
            status: row.status,
            updatedAt: row.updated_at,
        }
    }
}
