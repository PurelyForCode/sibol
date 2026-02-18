import { AppException } from '../AppException.js'

export class ProductUnitNotFoundException extends AppException {
    constructor(productId: string, unitId: string) {
        super(
            `Product with id ${productId} did not have a unit with id '${unitId}'`,
        )
    }
}
