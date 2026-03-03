import { Entity } from '../../shared/Entity.js'
import { EntityId } from '../../shared/EntityId.js'
import { Quantity } from '../../shared/value_objects/Quantity.js'

export class CartItem extends Entity {
    private constructor(
        id: EntityId,
        private _cartId: EntityId,
        private _productId: EntityId,
        private _sellUnitId: EntityId,
        private _quantity: Quantity,
        private _isValid: boolean,
    ) {
        super(id)
    }

    // the buyer can then edit it so that it is valid again
    invalidate() {
        this._isValid = false
    }

    changeQuantity(quantity: Quantity) {
        this._quantity = quantity
    }

    static new(
        id: EntityId,
        cartId: EntityId,
        productId: EntityId,
        sellUnitId: EntityId,
        quantity: Quantity,
    ) {
        return new CartItem(id, cartId, productId, sellUnitId, quantity, true)
    }

    static rehydrate(
        id: EntityId,
        cartId: EntityId,
        productId: EntityId,
        sellUnitId: EntityId,
        quantity: Quantity,
        isValid: boolean,
    ) {
        return new CartItem(
            id,
            cartId,
            productId,
            sellUnitId,
            quantity,
            isValid,
        )
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
    public get cartId(): EntityId {
        return this._cartId
    }
    public get isValid(): boolean {
        return this._isValid
    }
}
