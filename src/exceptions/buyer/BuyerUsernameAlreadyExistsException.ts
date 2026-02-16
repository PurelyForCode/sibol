import { ApplicationException } from '../../core/exceptions/ApplicationException.js'

export class BuyerUsernameAlreadyExistsException extends ApplicationException {
    static readonly code = 'BUYER_USERNAME_ALREADY_EXISTS'

    constructor(username: string) {
        super(`Buyer username '${username}' already exists`)
    }
}
