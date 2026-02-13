import { ApplicationException } from '../../core/exceptions/ApplicationException.js'

export class SellerNotFoundException extends ApplicationException {
    static readonly code = 'SELLER_NOT_FOUND'

    constructor(id: string) {
        super(`Seller with id ${id} not found`)
    }
}
