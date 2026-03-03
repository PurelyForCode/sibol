import { Knex } from 'knex'
import { ProductSellUnitDto } from '../../../features/dto/ProductSellUnitDto.js'
import { SellUnitRow } from '../tables/TableDefinitions.js'
import { SellUnitQueryRepository } from '../../../domain/product/repositories/SellUnitQueryRepository.js'

export class PgProductSellUnitQueryRepository {
    constructor(private readonly k: Knex | Knex.Transaction) {}

    async findById(
        id: string,
        productId: string,
    ): Promise<ProductSellUnitDto | null> {
        const row = await this.k<SellUnitRow>('sell_units')
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
        const sellUnits = await this.k<SellUnitRow>('sell_units')
            .select('*')
            .where('product_id', productId)

        const results: ProductSellUnitDto[] = []
        for (const sellUnit of sellUnits) {
            results.push(this.map(sellUnit))
        }

        return results
    }

    private map(row: SellUnitRow): ProductSellUnitDto {
        return {
            id: row.id,
            productId: row.product_id,
            unitSymbol: row.unit_symbol,
            conversionFactor: row.conversion_factor,
            displayName: row.display_name,
            pricePerUnit: row.price_per_unit,
            discontinuedAt: row.discontinued_at,
        }
    }
}
