import { ApplicationException } from '../../core/exceptions/ApplicationException.js'

export class StoreSlugAlreadyExistsException extends ApplicationException {
    static readonly code = 'STORE_SLUG_ALREADY_EXISTS'

    constructor(slug: string) {
        super(`Store slug '${slug}' already exists`)
    }
}
