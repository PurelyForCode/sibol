import { AppException } from '../AppException.js'

export class SellUnitDisplayNameIsAlreadyDeclaredException extends AppException {
    constructor(displayName: string, productId: string) {
        super(
            `Product sell unit '${displayName}' is already declared for product with id '${productId}'`,
        )
    }
}
