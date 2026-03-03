import { AggregateRoot } from '../../shared/AggregateRoot.js'
import { EntityId } from '../../shared/EntityId.js'
import { Money } from '../../shared/value_objects/Money.js'
import { Quantity } from '../../shared/value_objects/Quantity.js'

export class Sale extends AggregateRoot {
    private constructor(
        id: EntityId,
        private _buyerId: EntityId,
        private _productId: EntityId,
        private _sellUnitId: EntityId,
        private _quantity: Quantity,
        private _total: Money,
        private _createdAt: Date,
        private _updatedAt: Date,
    ) {
        super(id)
    }

    static new(
        id: EntityId,
        buyerId: EntityId,
        productId: EntityId,
        sellUnitId: EntityId,
        quantity: Quantity,
        total: Money,
    ) {
        const now = new Date()
        return new Sale(
            id,
            buyerId,
            productId,
            sellUnitId,
            quantity,
            total,
            now,
            now,
        )
    }

    static rehydrate(
        id: EntityId,
        buyerId: EntityId,
        productId: EntityId,
        sellUnitId: EntityId,
        quantity: Quantity,
        total: Money,
        createdAt: Date,
        updatedAt: Date,
    ) {
        return new Sale(
            id,
            buyerId,
            productId,
            sellUnitId,
            quantity,
            total,
            createdAt,
            updatedAt,
        )
    }

    public get updatedAt(): Date {
        return this._updatedAt
    }
    public get createdAt(): Date {
        return this._createdAt
    }
    public get total(): Money {
        return this._total
    }
    public get quantity(): Quantity {
        return this._quantity
    }
    public get sellUnitId(): EntityId {
        return this._sellUnitId
    }
    public get productId(): EntityId {
        return this._productId
    }
    public get buyerId(): EntityId {
        return this._buyerId
    }
}
