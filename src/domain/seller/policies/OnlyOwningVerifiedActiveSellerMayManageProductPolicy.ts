import { SellerDoesNotOwnProductException } from '../../../exceptions/product/SellerDoesNotOwnProductException.js'
import { SellerIsBannedException } from '../../../exceptions/seller/SellerIsBannedException.js'
import { SellerIsUnverifiedException } from '../../../exceptions/seller/SellerIsUnverifiedException.js'
import { Product } from '../../product/aggregates/Product.js'
import { Seller } from '../aggregates/Seller.js'

export class OnlyOwningVerifiedActiveSellerMayManageProductPolicy {
    static enforce(seller: Seller, product: Product) {
        if (!seller.isActive) {
            throw new SellerIsBannedException(seller.id.value)
        }

        if (!seller.isVerified) {
            throw new SellerIsUnverifiedException(seller.id.value)
        }

        if (!seller.id.equals(product.sellerId)) {
            throw new SellerDoesNotOwnProductException(
                seller.id.value,
                product.id.value,
            )
        }
    }
}
