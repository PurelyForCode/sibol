import { AppException } from '../AppException.js'

export class IncorrectPasswordException extends AppException {
    static readonly code = 'INCORRECT_PASSWORD'

    constructor() {
        super(`Password is incorrect`)
    }
}
