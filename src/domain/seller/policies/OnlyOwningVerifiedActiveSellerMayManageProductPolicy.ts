import { SellerDoesNotOwnProductException } from '../../../exceptions/product/SellerDoesNotOwnProductException.js'
import { Product } from '../../product/aggregates/Product.js'
import { Seller } from '../aggregates/Seller.js'

export class SellerMustOwnProductToManage {
    static enforce(seller: Seller, product: Product) {
        if (!seller.id.equals(product.sellerId)) {
            throw new SellerDoesNotOwnProductException(
                seller.id.value,
                product.id.value,
            )
        }
    }
}
