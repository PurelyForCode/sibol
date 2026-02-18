import { AppException } from '../AppException.js'

export class BuyerEmailAlreadyTakenException extends AppException {
    static readonly code = 'BUYER_ALREADY_EXISTS'

    constructor(email: string) {
        super(`Buyer with email ${email} already exists`)
    }
}
