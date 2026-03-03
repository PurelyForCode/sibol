import { AppException } from '../AppException.js'

export class ProductHasInsufficientReservedStockException extends AppException {
    constructor(productId: string) {
        super(`Product with id '${productId}' has insufficient reserved stock`)
    }
}
