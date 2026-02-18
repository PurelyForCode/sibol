import { AppException } from '../AppException.js'

export class ProductNotFoundException extends AppException {
    constructor(id: string) {
        super(`Product with id '${id}' not found`)
    }
}
