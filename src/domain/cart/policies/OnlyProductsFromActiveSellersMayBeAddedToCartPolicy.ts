import { CanNotAddToCartBecauseSellerIsBannedException } from '../../../exceptions/cart/CanNotAddToCartBecauseSellerIsBannedException.js'
import { Product } from '../../product/aggregates/Product.js'
import { Seller } from '../../seller/aggregates/Seller.js'

export class OnlyProductsFromActiveSellersMayBeAddedToCartPolicy {
    static enforce(product: Product, seller: Seller) {
        if (!seller.isActive) {
            throw new CanNotAddToCartBecauseSellerIsBannedException(
                product.id.value,
                seller.id.value,
            )
        }
    }
}
