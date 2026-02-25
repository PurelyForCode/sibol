import { SingleValueObject } from '../../../lib/domain/SingleValueObject.js'
import { Result } from '../../../lib/utils/Result.js'

export class Quantity extends SingleValueObject<number> {
    constructor(value: number) {
        super(value)
    }

    static create(value: number): Result<Quantity> {
        if (value < 0) {
            return Result.fail('Quantity can not be lower than 0')
        }
        if (!Number.isInteger(value)) {
            return Result.fail('Quantity must be an integer')
        }

        return Result.ok(new Quantity(value))
    }

    isValidQuantityForPiecesUnit() {
        return Number.isInteger(this.value)
    }
}
