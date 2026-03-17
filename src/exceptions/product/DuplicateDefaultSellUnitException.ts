import { AppException } from '../AppException.js'

export class DuplicateDefaultSellUnitException extends AppException {
    constructor() {
        super(`Product already has a default sell unit`)
    }
}
