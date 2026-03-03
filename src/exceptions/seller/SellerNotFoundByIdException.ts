import { AppException } from '../AppException.js'

export class SellerNotFoundByIdException extends AppException {
    static readonly code = 'SELLER_NOT_FOUND_BY_ID'

    constructor(id: string) {
        super(`Seller with id ${id} not found`)
    }
}
