import { BuyerIsBannedException } from '../../../exceptions/buyer/BuyerIsBannedException.js'
import { BuyerIsUnverifiedException } from '../../../exceptions/buyer/BuyerIsUnverifiedException.js'
import { AggregateRoot } from '../../../lib/domain/AggregateRoot.js'
import { EntityId } from '../../../lib/domain/EntityId.js'
import { Username } from '../../shared/value_objects/Username.js'
import { BuyerRegisteredDomainEvent } from '../events/BuyerRegisteredDomainEvent.js'

export class Buyer extends AggregateRoot {
    private constructor(
        private _id: EntityId,
        private _addressId: EntityId,
        private _username: Username,
        private _isVerified: boolean,
        private _isBanned: boolean,
        private _createdAt: Date,
        private _updatedAt: Date,
    ) {
        super()
    }

    assertIsVerified(): void {
        if (!this.isVerified) {
            throw new BuyerIsUnverifiedException(this.id.value)
        }
    }

    assertIsUnbanned(): void {
        if (this.isBanned) {
            throw new BuyerIsBannedException(this.id.value)
        }
    }

    static new(id: EntityId, addressId: EntityId, username: Username) {
        const now = new Date()
        const buyer = new Buyer(id, addressId, username, false, false, now, now)
        buyer.addEvent(new BuyerRegisteredDomainEvent(buyer.id.value))
        return buyer
    }

    static rehydrate(
        id: EntityId,
        addressId: EntityId,
        username: Username,
        isVerified: boolean,
        isBanned: boolean,
        createdAt: Date,
        updatedAt: Date,
    ) {
        return new Buyer(
            id,
            addressId,
            username,
            isVerified,
            isBanned,
            createdAt,
            updatedAt,
        )
    }

    public get id(): EntityId {
        return this._id
    }
    public get username(): Username {
        return this._username
    }
    public get isVerified(): boolean {
        return this._isVerified
    }
    public get isBanned(): boolean {
        return this._isBanned
    }
    public get createdAt(): Date {
        return this._createdAt
    }
    public get updatedAt(): Date {
        return this._updatedAt
    }
    public get addressId(): EntityId {
        return this._addressId
    }
}
