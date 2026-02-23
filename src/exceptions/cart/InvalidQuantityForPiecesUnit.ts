import { AppException } from '../AppException.js'

export class InvalidQuantityForPiecesUnit extends AppException {
    constructor() {
        super('Quantity is invalid for product with pieces unit')
    }
}
