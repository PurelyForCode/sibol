import { CartItemNotFoundException } from '../../../exceptions/cart/CartItemNotFoundException.js'
import { DuplicateProductSellUnitInCartException } from '../../../exceptions/cart/DuplicateProductSellUnitInCartException.js'
import { InvalidQuantityForPiecesUnit } from '../../../exceptions/cart/InvalidQuantityForPiecesUnit.js'
import { AggregateRoot } from '../../../lib/domain/AggregateRoot.js'
import { EntityId, Id } from '../../../lib/domain/EntityId.js'
import { ProductSellUnit } from '../../product/entities/ProductSellUnit.js'
import { Quantity } from '../../shared/value_objects/Quantity.js'
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

    addItem(id: EntityId, sellUnit: ProductSellUnit, quantity: Quantity) {
        if (
            sellUnit.unitSymbol.value === 'pieces' &&
            !quantity.isValidQuantityForPiecesUnit()
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
        const item = CartItem.new(
            id,
            this.buyerId,
            sellUnit.productId,
            sellUnit.id,
            quantity,
        )

        this._items.set(item.id.value, item)
    }

    removeItem(itemId: EntityId) {
        if (!this._items.delete(itemId.value)) {
            throw new CartItemNotFoundException(this.id.value, itemId.value)
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
