import { AppException } from '../AppException.js'

export class BuyerNotFoundByEmailException extends AppException {
    static readonly code = 'BUYER_NOT_FOUND_BY_EMAIL'

    constructor(email: string) {
        super(`Buyer with email ${email} not found`)
    }
}
