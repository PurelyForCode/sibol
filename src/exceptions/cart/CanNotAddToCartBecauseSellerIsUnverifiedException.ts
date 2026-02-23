import { AppException } from '../AppException.js'

export class CanNotAddToCartBecauseSellerIsUnverifiedException extends AppException {
    constructor(productId: string, sellerId: string) {
        super(
            `Can not add product with id '${productId}' to cart because its seller with id '${sellerId}' is unverified`,
        )
    }
}
