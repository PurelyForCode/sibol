import { Knex } from 'knex'
import { EntityId } from '../../../../lib/EntityId.js'
import { Product } from '../../domain/entities/product/Product.js'
import { ProductQueryRepository } from '../../domain/repositories/ProductRepository.js'
import { ProductDto } from '../../adapters/dto/ProductDto.js'
import { ProductRow } from './PostgresqlProductRepository.js'

export class PostgresqlProductQueryRepository implements ProductQueryRepository {
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
            stock: row.stock,
            unitOfMeasure: row.unit_of_measure,
            unitValue: row.unit_value,
            updatedAt: row.updated_at,
        }
    }
}
