import { AppException } from '../AppException.js'

export class ProductHasInsufficientAvailableStockException extends AppException {
    constructor(productId: string) {
        super(`Product with id '${productId}' has insufficient available stock`)
    }
}
