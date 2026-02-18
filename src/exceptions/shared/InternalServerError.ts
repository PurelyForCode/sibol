import { AppException } from '../AppException.js'

export class InternalServerError extends AppException {
    constructor(msg: string = 'Internal Server Error') {
        super(msg)
    }
}
