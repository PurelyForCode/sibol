import { AggregateRoot } from '../../../lib/domain/AggregateRoot.js'
import { EntityId } from '../../../lib/domain/EntityId.js'
import { Quantity } from '../../shared/value_objects/Quantity.js'
import { ConversionFactor } from '../../shared/value_objects/UnitValue.js'
import { MovementQuantity } from '../value_objects/MovementQuantity.js'
import { MovementReason } from '../value_objects/MovementReason.js'

export class InventoryMovement extends AggregateRoot {
    private constructor(
        private id: EntityId,
        private productId: EntityId,
        private deltaQuantity: MovementQuantity,
        private reason: MovementReason,
        private createdAt: Date,
    ) {
        super()
    }

    static new(
        id: EntityId,
        productId: EntityId,
        deltaQuantity: MovementQuantity,
        reason: MovementReason,
    ) {
        const now = new Date()
        return new InventoryMovement(id, productId, deltaQuantity, reason, now)
    }

    static rehydrate(
        id: EntityId,
        productId: EntityId,
        deltaQuantity: MovementQuantity,
        reason: MovementReason,
        createdAt: Date,
    ) {
        return new InventoryMovement(
            id,
            productId,
            deltaQuantity,
            reason,
            createdAt,
        )
    }
}
