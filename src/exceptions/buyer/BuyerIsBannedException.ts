import { AppException } from '../AppException.js'

export class BuyerIsBannedException extends AppException {
    static readonly code = 'BUYER_IS_BANNED'

    constructor(id: string) {
        super(`Buyer with id ${id} is banned`)
    }
}
