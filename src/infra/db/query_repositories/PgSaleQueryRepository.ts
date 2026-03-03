import { Knex } from 'knex'
import { EntityId } from '../../../domain/shared/EntityId.js'
import { SaleDto } from '../../../features/dto/SaleDto.js'
import { SaleRow } from '../tables/TableDefinitions.js'

export class PgSaleQueryRepository {
    constructor(private readonly k: Knex | Knex.Transaction) {}
    async findByIdAndSellerId(
        sellerId: string,
        id: string,
    ): Promise<SaleDto | null> {
        const row = (await this.k<SaleRow>('sales as s')
            .select('s.*')
            .leftJoin('products as p', 'p.id', 's.id')
            .leftJoin('sellers as se', 'se.id', 'p.seller_id')
            .where('se.id', sellerId)
            .where('s.id', id)
            .first()) as SaleRow | undefined
        if (!row) {
            return null
        }
        return this.map(row)
    }

    async findAllBySellerId(
        sellerId: string,
        params?: {
            filter?: unknown
            pagination?: { page?: number; limit?: number }
        },
    ): Promise<readonly SaleDto[]> {
        const rows = (await this.k<SaleRow>('sales as s')
            .select('s.*')
            .leftJoin('products as p', 'p.id', 's.id')
            .leftJoin('sellers as se', 'se.id', 'p.seller_id')
            .where('se.id', sellerId)) as SaleRow[]

        return rows.map(x => this.map(x))
    }
    private map(sale: SaleRow): SaleDto {
        return {
            buyerId: sale.buyer_id,
            createdAt: sale.created_at,
            id: sale.id,
            productId: sale.product_id,
            quantity: sale.quantity,
            sellUnitId: sale.sell_unit_id,
            total: sale.total,
            updatedAt: sale.updated_at,
        }
    }
}
