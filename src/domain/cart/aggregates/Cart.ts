import { AggregateRoot } from '../../../lib/domain/AggregateRoot.js'
import { EntityId } from '../../../lib/domain/EntityId.js'

export class Cart extends AggregateRoot {
    private constructor(
        private id: EntityId,
        private status: any,
        private shippingAddressId: EntityId,
        private subtotal: any,
        private taxTotal: any,
        private createdAt: Date,
        private updatedAt: Date,
    ) {
        super()
    }

    static new(id: EntityId, shippingAddressId: EntityId) {}

    static rehydrate(
        id: EntityId,
        status: any,
        shippingAddressId: EntityId,
        subtotal: any,
        taxTotal: any,
        createdAt: Date,
        updatedAt: Date,
    ) {
        return new Cart(
            id,
            status,
            shippingAddressId,
            subtotal,
            taxTotal,
            createdAt,
            updatedAt,
        )
    }
}
