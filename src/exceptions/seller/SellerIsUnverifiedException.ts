import { AppException } from '../AppException.js'

export class SellerIsUnverifiedException extends AppException {
    static readonly code = 'SELLER_EMAIL_ALREADY_EXISTS'

    constructor(sellerId: string) {
        super(
            `Seller with id ${sellerId} can not perform action because they are currently unverifed`,
        )
    }
}
