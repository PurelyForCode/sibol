import { ApplicationException } from '../../core/exceptions/ApplicationException.js'

export class SellerAlreadyExistsException extends ApplicationException {
    static readonly code = 'SELLER_ALREADY_EXISTS'

    constructor(email: string) {
        super(`Seller with email ${email} already exists`)
    }
}
