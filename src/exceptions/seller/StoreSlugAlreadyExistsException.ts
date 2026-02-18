import { AppException } from '../AppException.js'

export class StoreSlugAlreadyExistsException extends AppException {
    static readonly code = 'STORE_SLUG_ALREADY_EXISTS'

    constructor(slug: string) {
        super(`Store slug '${slug}' already exists`)
    }
}
