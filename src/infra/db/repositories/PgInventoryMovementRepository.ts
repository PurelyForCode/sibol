import { Knex } from 'knex'
import { InventoryMovement } from '../../../domain/inventory/aggregates/InventoryMovement.js'
import { InventoryMovementRepository } from '../../../domain/inventory/repositories/InventoryMovementRepository.js'
import { MovementQuantity } from '../../../domain/inventory/value_objects/MovementQuantity.js'
import { MovementReason } from '../../../domain/inventory/value_objects/MovementReason.js'
import { EntityId } from '../../../domain/shared/EntityId.js'
import { PgBaseRepository } from './PgBaseRepository.js'
import { UnitOfWork } from '../../../domain/shared/interfaces/UnitOfWork.js'
import { InventoryMovementRow } from '../tables/TableDefinitions.js'

export class PgInventoryMovementRepository
    extends PgBaseRepository<InventoryMovement>
    implements InventoryMovementRepository
{
    constructor(
        private readonly knex: Knex.Transaction,
        private readonly uow: UnitOfWork,
    ) {
        super()
    }

    async findById(id: EntityId): Promise<InventoryMovement | null> {
        const row = await this.knex<InventoryMovementRow>('inventory_movement')
            .where('id', id.value)
            .first()
        if (!row) {
            return null
        }

        return this.mapToEntity(row)
    }
    async existsById(id: EntityId): Promise<boolean> {
        const row = await this.knex<InventoryMovementRow>('inventory_movement')
            .select(this.knex.raw(1))
            .where('id', id.value)
            .first()
        return !!row
    }
    async save(entity: InventoryMovement): Promise<void> {
        await this.knex<InventoryMovementRow>('inventory_movement')
            .insert({
                created_at: entity.createdAt,
                delta_quantity: entity.deltaQuantity.value,
                id: entity.id.value,
                product_id: entity.productId.value,
                reason: entity.reason.value,
            })
            .onConflict('id')
            .merge()
        this.uow.registerAggregate(entity)
    }
    async delete(id: EntityId): Promise<void> {
        await this.knex<InventoryMovementRow>('inventory_movement')
            .delete()
            .where('id', id.value)
    }

    private mapToEntity(row: InventoryMovementRow): InventoryMovement {
        const id = EntityId.create(row.id)
        const productId = EntityId.create(row.product_id)
        const deltaQuantity = MovementQuantity.create(
            row.delta_quantity,
        ).getValue()
        const reason = MovementReason.create(row.reason).getValue()
        return InventoryMovement.rehydrate(
            id,
            productId,
            deltaQuantity,
            reason,
            row.created_at,
        )
    }
}
