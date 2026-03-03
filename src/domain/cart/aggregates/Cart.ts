import { CartItemNotFoundException } from '../../../exceptions/cart/CartItemNotFoundException.js'
import { DuplicateProductSellUnitInCartException } from '../../../exceptions/cart/DuplicateProductSellUnitInCartException.js'
import { InvalidQuantityForPiecesUnit } from '../../../exceptions/cart/InvalidQuantityForPiecesUnit.js'
import { AggregateRoot } from '../../shared/AggregateRoot.js'
import { EntityId, Id } from '../../shared/EntityId.js'
import { ProductSellUnit } from '../../product/entities/ProductSellUnit.js'
import { CartItem } from '../entities/CartItem.js'
import { CartStatus } from '../value_objects/CartStatus.js'

// TODO: What other behaviour needs to exist in the cart?
export class Cart extends AggregateRoot {
    private constructor(
        buyerId: EntityId,
        private _status: CartStatus,
        private _shippingAddressId: EntityId,
        private _createdAt: Date,
        private _updatedAt: Date,
        private _items: Map<Id, CartItem>,
    ) {
        super(buyerId)
    }

    invalidateItem(cartItemId: EntityId) {
        const item = this._items.get(cartItemId.value)
        if (!item) {
            throw new CartItemNotFoundException(this.id.value, cartItemId.value)
        }
        item.invalidate()
    }

    addItem(cartItem: CartItem, sellUnit: ProductSellUnit) {
        if (
            sellUnit.unitSymbol.value === 'pieces' &&
            !cartItem.quantity.isValidQuantityForPiecesUnit()
        ) {
            throw new InvalidQuantityForPiecesUnit()
        }

        for (const [_key, item] of this._items) {
            if (item.sellUnitId.equals(sellUnit.id)) {
                throw new DuplicateProductSellUnitInCartException(
                    sellUnit.productId.value,
                    sellUnit.id.value,
                )
            }
        }

        // TODO: Maybe add more validation to the quantity
        this._items.set(cartItem.id.value, cartItem)
    }

    removeItem(itemId: EntityId) {
        if (!this._items.delete(itemId.value)) {
            throw new CartItemNotFoundException(this.id.value, itemId.value)
        }
    }

    removeInvalidItems() {
        for (const [k, item] of this._items) {
            if (!item.isValid) {
                this._items.delete(k)
            }
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

    getItems(itemIds: EntityId[]): CartItem[] {
        const items = []
        for (const id of itemIds) {
            const item = this._items.get(id.value)
            if (!item) {
                throw new CartItemNotFoundException(
                    this.buyerId.value,
                    id.value,
                )
            }
            items.push(item)
        }
        return items
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
        return this.id
    }
}
