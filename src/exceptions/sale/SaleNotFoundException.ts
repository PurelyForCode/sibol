import { AppException } from '../AppException.js'

export class SaleNotFoundException extends AppException {
    constructor(saleId: string) {
        super(`Sale with id '${saleId}' was not found`)
    }
}
