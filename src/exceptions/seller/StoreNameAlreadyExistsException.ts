import { AppException } from '../AppException.js'

export class StoreNameAlreadyExistsException extends AppException {
    static readonly code = 'STORE_NAME_ALREADY_EXISTS'

    constructor(storeName: string) {
        super(`Store name '${storeName}' already exists`)
    }
}
