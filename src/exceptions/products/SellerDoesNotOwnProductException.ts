import { ApplicationException } from '../../core/exceptions/ApplicationException.js'

export class SellerDoesNotOwnProductException extends ApplicationException {
    constructor(sellerId: string, productId: string) {
        super(
            `Seller with id '${sellerId}' does not own product with id '${productId}'`,
        )
    }
}
