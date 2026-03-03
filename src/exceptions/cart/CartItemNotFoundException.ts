import { AppException } from '../AppException.js'

export class CartItemNotFoundException extends AppException {
    constructor(buyerId: string, itemId: string) {
        super(
            `Cart that belongs to buyer with id '${buyerId}' does not contain item with id '${itemId}'`,
        )
    }
}
