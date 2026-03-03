import { AppException } from '../AppException.js'

export class ProductSellUnitAlreadyDefinedException extends AppException {
    constructor(unit: string, productId: string) {
        super(
            `Product sell unit '${unit}' is already defined for this product with id ${productId}`,
        )
    }
}
