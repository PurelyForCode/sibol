import { AppException } from '../AppException.js'

export class InvalidRawPasswordException extends AppException {
    constructor(msg: string) {
        super(msg)
    }
}
