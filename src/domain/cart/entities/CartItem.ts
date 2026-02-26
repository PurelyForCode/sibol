import { Entity } from '../../../lib/domain/Entity.js'
import { EntityId } from '../../../lib/domain/EntityId.js'
import { Quantity } from '../../shared/value_objects/Quantity.js'

export class CartItem extends Entity {
    private constructor(
        id: EntityId,
        private _cartId: EntityId,
        private _productId: EntityId,
        private _sellUnitId: EntityId,
        private _quantity: Quantity,
    ) {
        super(id)
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
        return new CartItem(id, cartId, productId, sellUnitId, quantity)
    }

    static rehydrate(
        id: EntityId,
        cartId: EntityId,
        productId: EntityId,
        sellUnitId: EntityId,
        quantity: Quantity,
    ) {
        return new CartItem(id, cartId, productId, sellUnitId, quantity)
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
}
