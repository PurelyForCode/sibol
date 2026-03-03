import { AppException } from '../AppException.js'

export class BuyerUsernameAlreadyExistsException extends AppException {
    static readonly code = 'BUYER_USERNAME_ALREADY_EXISTS'

    constructor(username: string) {
        super(`Buyer username '${username}' already exists`)
    }
}
