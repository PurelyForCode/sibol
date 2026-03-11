import { AppException } from '../AppException.js'

export class InvalidResourceAccessException extends AppException {
    constructor() {
        super('User is not authorized to access that resource')
    }
}
