import { AppException } from '../AppException.js'

export class InvalidQuantity extends AppException {
    constructor() {
        super('Quantity is invalid')
    }
}
