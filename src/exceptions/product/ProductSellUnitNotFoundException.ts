import { AppException } from '../AppException.js'

export class ProductSellUnitNotFoundException extends AppException {
    constructor(sellUnit: string, productId: string) {
        super(
            `Product sell unit '${sellUnit}' is not found for this product with id ${productId}`,
        )
    }
}
