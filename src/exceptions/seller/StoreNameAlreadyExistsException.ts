import { ApplicationException } from '../../core/exceptions/ApplicationException.js'

export class StoreNameAlreadyExistsException extends ApplicationException {
    static readonly code = 'STORE_NAME_ALREADY_EXISTS'

    constructor(storeName: string) {
        super(`Store name '${storeName}' already exists`)
    }
}
