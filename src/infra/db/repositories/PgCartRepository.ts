import { Knex } from 'knex'
import { Cart } from '../../../domain/cart/aggregates/Cart.js'
import { CartRepository } from '../../../domain/cart/repositories/CartRepository.js'
import { EntityId } from '../../../lib/domain/EntityId.js'
import { CartItemRow, CartRow } from '../tables/TableDefinitions.js'
import {
    CartStatus,
    CartStatusEnum,
} from '../../../domain/cart/value_objects/CartStatus.js'
import { CartItem } from '../../../domain/cart/entities/CartItem.js'
import { Quantity } from '../../../domain/shared/value_objects/Quantity.js'
import { UnitOfMeasurement } from '../../../domain/shared/value_objects/UnitOfMeasurement.js'

export class PgCartRepository implements CartRepository {
    constructor(private readonly knex: Knex.Transaction) {}

    async findById(id: EntityId): Promise<Cart | null> {
        const cartRow = await this.knex<CartRow>('carts')
            .where('buyer_id', id.value)
            .first()

        if (!cartRow) {
            return null
        }

        const itemRows = await this.knex<CartItemRow>('cart_items').where(
            'cart_id',
            cartRow.buyer_id,
        )
        return this.map(cartRow, itemRows)
    }
    async existsById(id: EntityId): Promise<boolean> {
        const row = await this.knex<CartRow>('carts')
            .where('buyer_id', id.value)
            .first()
        return !!row
    }
    async save(entity: Cart): Promise<void> {
        await this.knex<CartRow>('carts')
            .insert({
                buyer_id: entity.buyerId.value,
                created_at: entity.createdAt,
                updated_at: entity.updatedAt,
                shipping_address_id: entity.shippingAddressId.value,
                status: entity.status.value,
            })
            .onConflict('buyer_id')
            .merge()

        for (const [_, value] of entity.items) {
            await this.knex<CartItemRow>('cart_items')
                .insert({
                    cart_id: value.cartId.value,
                    id: value.id.value,
                    product_id: value.productId.value,
                    quantity: value.quantity.value,
                    sell_unit: value.sellUnit.value,
                })
                .onConflict('id')
                .merge()
        }
    }

    async delete(id: EntityId): Promise<void> {
        await this.knex<CartRow>('carts').delete().where('id', id.value)
    }

    private map(row: CartRow, itemRows: CartItemRow[]): Cart {
        const cartItems = new Map()
        for (const row of itemRows) {
            const id = EntityId.create(row.id)
            const productId = EntityId.create(row.product_id)
            const cartId = EntityId.create(row.cart_id)
            const sellUnit = UnitOfMeasurement.create(row.sell_unit).getValue()
            const quantity = Quantity.create(row.quantity).getValue()

            const item = CartItem.rehydrate(
                id,
                cartId,
                productId,
                sellUnit,
                quantity,
            )
            cartItems.set(item.id.value, item)
        }
        const buyerId = EntityId.create(row.buyer_id)
        const status = CartStatus.create(
            row.status as CartStatusEnum,
        ).getValue()
        const shippingAddressId = EntityId.create(row.shipping_address_id)
        const cart = Cart.rehydrate(
            buyerId,
            status,
            shippingAddressId,
            row.created_at,
            row.updated_at,
            cartItems,
        )
        return cart
    }
}
