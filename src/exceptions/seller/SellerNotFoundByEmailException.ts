import { AppException } from '../AppException.js'

export class SellerNotFoundByEmailException extends AppException {
    static readonly code = 'SELLER_NOT_FOUND_BY_EMAIL'

    constructor(email: string) {
        super(`Seller with email ${email} not found`)
    }
}
