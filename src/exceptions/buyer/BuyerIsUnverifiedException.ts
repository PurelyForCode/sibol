import { AppException } from '../AppException.js'

export class BuyerIsUnverifiedException extends AppException {
    static readonly code = 'BUYER_IS_UNVERIFIED'

    constructor(id: string) {
        super(`Buyer with id ${id} is unverified`)
    }
}
