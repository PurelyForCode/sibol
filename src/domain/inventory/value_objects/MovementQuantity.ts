import { SingleValueObject } from '../../shared/SingleValueObject.js'
import { Result } from '../../../types/utils/Result.js'

export class MovementQuantity extends SingleValueObject<number> {
    private constructor(value: number) {
        super(value)
    }

    static create(value: number) {
        if (!Number.isInteger(value)) {
            Result.fail('Inventory movement must be integer')
        }
        return Result.ok(new MovementQuantity(value))
    }
}
