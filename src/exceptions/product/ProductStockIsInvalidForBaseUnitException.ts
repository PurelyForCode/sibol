import { AppException } from '../AppException.js'

export class ProductStockIsInvalidForBaseUnitException extends AppException {
    constructor(productId: string, baseUnit: string, stockQuantity: number) {
        super(
            `Product with id '${productId}' and baseUnit of '${baseUnit}' can not have a stock with a value of '${stockQuantity}'`,
        )
    }
}
