import { AppException } from '../AppException.js'

export class SellerAlreadyHasAStoreException extends AppException {
    static readonly code = 'SELLER_HAS_STORE_EXCEPTION'

    constructor(id: string) {
        super(`Seller with id ${id} already has a store`)
    }
}
