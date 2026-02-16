import { ApplicationException } from '../../core/exceptions/ApplicationException.js'

export class DuplicateProductNameException extends ApplicationException {
    constructor(name: string) {
        super(`Seller already has a product named '${name}'`)
    }
}
