import { AppException } from '../AppException.js'

export class SellerDoesNotOwnProductException extends AppException {
    constructor(sellerId: string, productId: string) {
        super(
            `Seller with id '${sellerId}' does not own product with id '${productId}'`,
        )
    }
}
