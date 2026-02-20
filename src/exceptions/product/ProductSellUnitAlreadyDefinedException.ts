import { AppException } from '../AppException.js'

export class ProductSellUnitAlreadyDefinedException extends AppException {
    constructor(sellUnit: string, productId: string) {
        super(
            `Product sell unit '${sellUnit}' is already defined for this product with id ${productId}`,
        )
    }
}
