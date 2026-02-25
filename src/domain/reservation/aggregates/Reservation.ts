import { AggregateRoot } from '../../../lib/domain/AggregateRoot.js'
import { EntityId } from '../../../lib/domain/EntityId.js'
import { Quantity } from '../../shared/value_objects/Quantity.js'
import { UnitOfMeasurement } from '../../shared/value_objects/UnitOfMeasurement.js'
import { ReservationStatus } from '../value_objects/ReservationStatus.js'

export class Reservation extends AggregateRoot {
    private constructor(
        private _id: EntityId,
        private _buyerId: EntityId,
        private _productId: EntityId,
        private _sellUnit: UnitOfMeasurement,
        private _quantity: Quantity,
        private _pickupDate: Date,
        private _status: ReservationStatus,
        private _createdAt: Date,
        private _updatedAt: Date,
    ) {
        super()
    }

    static new(
        id: EntityId,
        buyerId: EntityId,
        productId: EntityId,
        sellUnit: UnitOfMeasurement,
        quantity: Quantity,
        pickupDate: Date,
    ) {
        const now = new Date()
        return new Reservation(
            id,
            buyerId,
            productId,
            sellUnit,
            quantity,
            pickupDate,
            ReservationStatus.reserved(),
            now,
            now,
        )
    }

    static rehydrate(
        id: EntityId,
        buyerId: EntityId,
        productId: EntityId,
        sellUnit: UnitOfMeasurement,
        quantity: Quantity,
        pickupDate: Date,
        status: ReservationStatus,
        createdAt: Date,
        updatedAt: Date,
    ) {
        return new Reservation(
            id,
            buyerId,
            productId,
            sellUnit,
            quantity,
            pickupDate,
            status,
            createdAt,
            updatedAt,
        )
    }

    public get status(): ReservationStatus {
        return this._status
    }
    public get pickupDate(): Date {
        return this._pickupDate
    }
    public get quantity(): Quantity {
        return this._quantity
    }
    public get productId(): EntityId {
        return this._productId
    }
    public get buyerId(): EntityId {
        return this._buyerId
    }
    public get id(): EntityId {
        return this._id
    }
    public get sellUnit(): UnitOfMeasurement {
        return this._sellUnit
    }
    public get updatedAt(): Date {
        return this._updatedAt
    }
    public get createdAt(): Date {
        return this._createdAt
    }
}
