import { AppException } from '../AppException.js'

export class ProductHasInsufficientStockException extends AppException {
    constructor(productId: string) {
        super(`Product with id '${productId}' has insufficient stock`)
    }
}
