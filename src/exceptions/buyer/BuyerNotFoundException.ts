import { ApplicationException } from '../../core/exceptions/ApplicationException.js'

export class BuyerNotFoundException extends ApplicationException {
    static readonly code = 'BUYER_NOT_FOUND'

    constructor(id: string) {
        super(`Buyer with id ${id} not found`)
    }
}
