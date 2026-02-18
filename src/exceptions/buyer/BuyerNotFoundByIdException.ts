import { AppException } from '../AppException.js'

export class BuyerNotFoundByIdException extends AppException {
    static readonly code = 'BUYER_NOT_FOUND_BY_ID'

    constructor(id: string) {
        super(`Buyer with id ${id} not found`)
    }
}
