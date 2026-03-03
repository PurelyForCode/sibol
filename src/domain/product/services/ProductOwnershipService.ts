import { SellerDoesNotOwnProductException } from '../../../exceptions/product/SellerDoesNotOwnProductException.js'
import { Seller } from '../../seller/aggregates/Seller.js'
import { Product } from '../aggregates/Product.js'

export class ProductOwnershipService {
    static assertSellerOwnsProduct(seller: Seller, product: Product): void {
        if (!seller.id.equals(product.sellerId)) {
            throw new SellerDoesNotOwnProductException(
                seller.id.value,
                product.id.value,
            )
        }
    }
}
