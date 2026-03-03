import { AppException } from '../AppException.js'

export class ProductsHaveInsufficientStockException extends AppException {
    constructor(productIds: string[]) {
        super(`Products with ids [${productIds}] have insufficient stock`)
    }
}
