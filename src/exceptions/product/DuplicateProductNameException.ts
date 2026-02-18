import { AppException } from '../AppException.js'

export class DuplicateProductNameException extends AppException {
    constructor(name: string) {
        super(`Seller already has a product named '${name}'`)
    }
}
