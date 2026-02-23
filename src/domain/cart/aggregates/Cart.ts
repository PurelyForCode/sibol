import { CartItemNotFoundException } from '../../../exceptions/cart/CartItemNotFoundException.js'
import { InvalidQuantityForPiecesUnit } from '../../../exceptions/cart/InvalidQuantityForPiecesUnit.js'
import { AggregateRoot } from '../../../lib/domain/AggregateRoot.js'
import { EntityId, Id } from '../../../lib/domain/EntityId.js'
import { ProductSellUnit } from '../../product/entities/ProductSellUnit.js'
import { Quantity } from '../../shared/value_objects/Quantity.js'
import { CartItem } from '../entities/CartItem.js'
import { CartStatus } from '../value_objects/CartStatus.js'

export class Cart extends AggregateRoot {
    private constructor(
        private _buyerId: EntityId,
        private _status: CartStatus,
        private _shippingAddressId: EntityId,
        private _createdAt: Date,
        private _updatedAt: Date,
        private _items: Map<Id, CartItem>,
    ) {
        super()
    }

    addItem(id: EntityId, sellUnit: ProductSellUnit, quantity: Quantity) {
        if (
            sellUnit.unit.value === 'pcs' &&
            !quantity.isValidQuantityForPiecesUnit()
        ) {
            throw new InvalidQuantityForPiecesUnit()
        }
        // TODO: Maybe add more validation to the quantity
        const item = CartItem.new(
            id,
            this.buyerId,
            sellUnit.productId,
            sellUnit.unit,
            quantity,
        )

        this._items.set(item.id.value, item)
    }

    removeItem(itemId: EntityId) {
        if (!this._items.delete(itemId.value)) {
            throw new CartItemNotFoundException(
                this._buyerId.value,
                itemId.value,
            )
        }
    }

    static new(buyerId: EntityId, shippingAddressId: EntityId) {
        const now = new Date()
        return new Cart(
            buyerId,
            CartStatus.active(),
            shippingAddressId,
            now,
            now,
            new Map(),
        )
    }

    static rehydrate(
        buyerId: EntityId,
        status: CartStatus,
        shippingAddressId: EntityId,
        createdAt: Date,
        updatedAt: Date,
        items: Map<Id, CartItem>,
    ) {
        return new Cart(
            buyerId,
            status,
            shippingAddressId,
            createdAt,
            updatedAt,
            items,
        )
    }

    public get items(): Map<Id, CartItem> {
        return this._items
    }
    public get updatedAt(): Date {
        return this._updatedAt
    }
    public get createdAt(): Date {
        return this._createdAt
    }
    public get shippingAddressId(): EntityId {
        return this._shippingAddressId
    }
    public get status(): CartStatus {
        return this._status
    }
    public get buyerId(): EntityId {
        return this._buyerId
    }
}
