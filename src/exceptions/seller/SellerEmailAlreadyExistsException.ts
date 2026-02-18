import { AppException } from '../AppException.js'

export class SellerEmailAlreadyExistsException extends AppException {
    static readonly code = 'SELLER_EMAIL_ALREADY_EXISTS'

    constructor(email: string) {
        super(`Seller with email ${email} already exists`)
    }
}
