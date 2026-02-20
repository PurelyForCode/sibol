import { AppException } from '../AppException.js'

export class ProductSellUnitIsNotConvertibleException extends AppException {
    constructor(unit: string, productId: string) {
        super(
            `Product with id ${productId} is not convertible to the sell unit '${unit}'`,
        )
    }
}
