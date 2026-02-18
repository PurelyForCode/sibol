import { ApplicationException } from '../../core/exceptions/ApplicationException.js'

export class ProductUnitNotFoundException extends ApplicationException {
    constructor(productId: string, unitId: string) {
        super(
            `Product with id ${productId} did not have a unit with id '${unitId}'`,
        )
    }
}
