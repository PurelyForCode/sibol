import { AppException } from '../AppException.js'

export class BuyerHasAlreadyReviewedSaleException extends AppException {
    constructor(buyerId: string, saleId: string) {
        super(
            `Buyer with id '${buyerId}' has already reviewed their purchase with id '${saleId}'`,
        )
    }
}
