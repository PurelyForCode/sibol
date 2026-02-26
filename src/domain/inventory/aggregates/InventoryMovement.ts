import { AggregateRoot } from '../../../lib/domain/AggregateRoot.js'
import { EntityId } from '../../../lib/domain/EntityId.js'
import { MovementQuantity } from '../value_objects/MovementQuantity.js'
import { MovementReason } from '../value_objects/MovementReason.js'

export class InventoryMovement extends AggregateRoot {
    private constructor(
        id: EntityId,
        private _productId: EntityId,
        private _deltaQuantity: MovementQuantity,
        private _reason: MovementReason,
        private _createdAt: Date,
    ) {
        super(id)
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

    public get createdAt(): Date {
        return this._createdAt
    }
    public get reason(): MovementReason {
        return this._reason
    }
    public get deltaQuantity(): MovementQuantity {
        return this._deltaQuantity
    }
    public get productId(): EntityId {
        return this._productId
    }
}
