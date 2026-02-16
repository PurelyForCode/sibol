import { ApplicationException } from '../../core/exceptions/ApplicationException.js'

export class BuyerAlreadyExistsException extends ApplicationException {
    static readonly code = 'BUYER_ALREADY_EXISTS'

    constructor(email: string) {
        super(`Buyer with email ${email} already exists`)
    }
}
