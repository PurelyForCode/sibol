import { AppException } from '../AppException.js'

export class CanNotDiscontinueDefaultSellUnitException extends AppException {
    constructor(sellUnitId: string) {
        super(
            `Can not discontinue a sell unit because it is set as default '${sellUnitId}'`,
        )
    }
}
