import { AppException } from '../AppException.js'

export class DuplicateProductSellUnitInCartException extends AppException {
    constructor(productId: string, sellUnitId: string) {
        super(
            `Product with id ${productId} and sell unit with id ${sellUnitId} is already inside the buyer's cart`,
        )
    }
}
