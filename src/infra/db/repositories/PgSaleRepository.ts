import { Sale } from '../../../domain/sale/aggregates/Sale.js'
import { SaleRepository } from '../../../domain/sale/repositories/SaleRepository.js'
import { EntityId } from '../../../domain/shared/EntityId.js'
import { PgBaseRepository } from './PgBaseRepository.js'
import { SaleRow } from '../tables/TableDefinitions.js'
import { Quantity } from '../../../domain/shared/value_objects/Quantity.js'
import { Money } from '../../../domain/shared/value_objects/Money.js'
import { Knex } from 'knex'
import { UnitOfWork } from '../../../domain/shared/interfaces/UnitOfWork.js'

export class PgSaleRepository
    extends PgBaseRepository<Sale>
    implements SaleRepository
{
    constructor(
        private readonly knex: Knex.Transaction,
        private readonly uow: UnitOfWork,
    ) {
        super()
    }

    async findById(id: EntityId): Promise<Sale | null> {
        const row = await this.knex<SaleRow>('sales')
            .where('id', id.value)
            .first()
        if (!row) {
            return null
        }
        return this.map(row)
    }

    async existsById(id: EntityId): Promise<boolean> {
        const row = await this.knex<SaleRow>('sales')
            .where('id', id.value)
            .first()
        return !!row
    }

    async save(entity: Sale): Promise<void> {
        await this.knex<SaleRow>('sales')
            .insert({
                buyer_id: entity.buyerId.value,
                created_at: entity.createdAt,
                id: entity.id.value,
                product_id: entity.productId.value,
                quantity: entity.quantity.value,
                sell_unit_id: entity.sellUnitId.value,
                total: entity.total.value,
                updated_at: entity.updatedAt,
            })
            .onConflict('id')
            .merge()
        this.uow.registerAggregate(entity)
    }

    async delete(id: EntityId): Promise<void> {
        await this.knex('sales').delete().where('id', id.value)
    }

    private map(row: SaleRow): Sale {
        const id = EntityId.create(row.id)
        const buyerId = EntityId.create(row.buyer_id)
        const productId = EntityId.create(row.product_id)
        const sellUnitId = EntityId.create(row.sell_unit_id)
        const quantity = Quantity.create(row.quantity).getValue()
        const total = Money.create(row.total).getValue()
        return Sale.rehydrate(
            id,
            buyerId,
            productId,
            sellUnitId,
            quantity,
            total,
            row.created_at,
            row.updated_at,
        )
    }
}
