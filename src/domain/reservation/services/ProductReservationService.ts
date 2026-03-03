import { InternalServerError } from '../../../exceptions/shared/InternalServerError.js'
import { CartItem } from '../../cart/entities/CartItem.js'
import { Product } from '../../product/aggregates/Product.js'
import { Reservation } from '../aggregates/Reservation.js'

export class ProductReservationService {
    reserve(cartItem: CartItem, product: Product): Reservation {
        const sellUnit = product.getSellUnitById(cartItem.sellUnitId)
        if (!sellUnit) {
            throw new InternalServerError('Sell unit got deleted')
        }
        const toBeReserved = sellUnit.convertQuantityToProductStock(
            cartItem.quantity,
        )
    }
}
