import { EntityId } from '../EntityId.js'

export class Address {
    private constructor(
        private _id: EntityId,
        private _buyerId: EntityId | null,
        private _sellerId: EntityId | null,
    ) {}

    static new(
        id: EntityId,
        buyerId: EntityId | null,
        sellerId: EntityId | null,
    ) {
        return new Address(id, buyerId, sellerId)
    }

    static rehydrate(
        id: EntityId,
        buyerId: EntityId | null,
        sellerId: EntityId | null,
    ) {
        return new Address(id, buyerId, sellerId)
    }

    public get sellerId(): EntityId | null {
        return this._sellerId
    }
    public get buyerId(): EntityId | null {
        return this._buyerId
    }
    public get id(): EntityId {
        return this._id
    }
}
