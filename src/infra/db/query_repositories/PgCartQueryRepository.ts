import { Knex } from 'knex'
import { EntityId } from '../../../domain/shared/EntityId.js'
import { ProductDto } from '../../../features/dto/ProductDto.js'
import {
    CartItemRow,
    CartRow,
    ProductInventoryRow,
    ProductRow,
} from '../tables/TableDefinitions.js'
import { InternalServerError } from '../../../exceptions/shared/InternalServerError.js'
import { CartDto } from '../../../features/dto/CartDto.js'
import { CartItemDto } from '../../../features/dto/CartItemDto.js'

export class PgCartQueryRepository {
    constructor(private readonly k: Knex | Knex.Transaction) {}

    async findByBuyerId(id: EntityId): Promise<CartDto | null> {
        const cart = await this.k<CartRow>('carts')
            .select('*')
            .where('buyer_id', id.value)
            .first()
        if (!cart) {
            return null
        }
        const items = await this.k<CartItemRow>('cart_items').where(
            'cart_id',
            cart.buyer_id,
        )
        return this.map(cart, items)
    }

    private map(row: CartRow, itemRows: CartItemRow[]): CartDto {
        const items: CartItemDto[] = []
        for (const itemRow of itemRows) {
            items.push({
                id: itemRow.id,
                cartId: itemRow.cart_id,
                productId: itemRow.product_id,
                sellUnitId: itemRow.sell_unit_id,
                quantity: itemRow.quantity,
                isValid: itemRow.is_valid,
            } as CartItemDto)
        }

        return {
            buyerId: row.buyer_id,
            shippingAddressId: row.shipping_address_id,
            status: row.status,
            createdAt: row.created_at,
            updatedAt: row.updated_at,
            items: items,
        }
    }
}
