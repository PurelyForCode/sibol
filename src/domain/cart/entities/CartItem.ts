import { InvalidQuantityForPiecesUnit } from '../../../exceptions/cart/InvalidQuantityForPiecesUnit.js'
import { AddSellUnitCmd } from '../../../features/products/add_sell_unit/AddSellUnitUsecase.js'
import { EntityId } from '../../../lib/domain/EntityId.js'
import { ProductSellUnit } from '../../product/entities/ProductSellUnit.js'
import { Quantity } from '../../shared/value_objects/Quantity.js'
import { UnitOfMeasurement } from '../../shared/value_objects/UnitOfMeasurement.js'

export class CartItem {
    private constructor(
        private _id: EntityId,
        private _cartId: EntityId,
        private _productId: EntityId,
        private _sellUnit: UnitOfMeasurement,
        private _quantity: Quantity,
    ) {}

    changeQuantity(quantity: Quantity) {
        this._quantity = quantity
    }

    static new(
        id: EntityId,
        cartId: EntityId,
        productId: EntityId,
        sellUnit: UnitOfMeasurement,
        quantity: Quantity,
    ) {
        return new CartItem(id, cartId, productId, sellUnit, quantity)
    }

    static rehydrate(
        id: EntityId,
        cartId: EntityId,
        productId: EntityId,
        sellUnit: UnitOfMeasurement,
        quantity: Quantity,
    ) {
        return new CartItem(id, cartId, productId, sellUnit, quantity)
    }

    public get quantity(): Quantity {
        return this._quantity
    }
    public get sellUnit(): UnitOfMeasurement {
        return this._sellUnit
    }
    public get productId(): EntityId {
        return this._productId
    }
    public get cartId(): EntityId {
        return this._cartId
    }
    public get id(): EntityId {
        return this._id
    }
}
