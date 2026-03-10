import { AppException } from '../AppException.js'

export class SellUnitIsNotDefaultException extends AppException {
    constructor(sellUnit: string, productId: string) {
        super(
            `Action is invalid, product sell unit '${sellUnit}' is not set as default product with id ${productId}`,
        )
    }
}
