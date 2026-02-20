import { Knex } from 'knex'
import { EntityId } from '../../../lib/domain/EntityId.js'
import { ProductSellUnitDto } from '../../../features/dto/ProductSellUnitDto.js'
import { ProductSellUnitRow } from '../tables/TableDefinitions.js'

export class PgProductSellUnitQueryRepository {
    constructor(private readonly k: Knex) {}

    async findById(
        id: string,
        productId: string,
    ): Promise<ProductSellUnitDto | null> {
        const row = await this.k<ProductSellUnitRow>('product_sell_units')
            .select('*')
            .where('id', id)
            .where('product_id', productId)
            .first()
        if (!row) {
            return null
        }
        return this.map(row)
    }

    async findAllByProductId(
        productId: string,
    ): Promise<readonly ProductSellUnitDto[]> {
        const sellUnits = await this.k<ProductSellUnitRow>('product_sell_units')
            .select('*')
            .where('product_id', productId)

        const results: ProductSellUnitDto[] = []
        for (const sellUnit of sellUnits) {
            results.push(this.map(sellUnit))
        }

        return results
    }

    private map(row: ProductSellUnitRow): ProductSellUnitDto {
        return {
            conversionFactor: row.conversion_factor,
            id: row.id,
            productId: row.product_id,
            unit: row.unit,
        }
    }
}
