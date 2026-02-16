import { ApplicationException } from '../../core/exceptions/ApplicationException.js'

export class ProductNotFoundException extends ApplicationException {
    constructor(id: string) {
        super(`Product with id '${id}' not found`)
    }
}
