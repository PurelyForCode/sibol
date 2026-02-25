import { SingleValueObject } from '../../../lib/domain/SingleValueObject.js'
import { Result } from '../../../lib/utils/Result.js'

// Only mass, volume, and distance can be converted for now

export class ConversionFactor extends SingleValueObject<number> {
    private constructor(value: number) {
        super(value)
    }

    static create(value: number): Result<ConversionFactor> {
        if (value <= 0) {
            return Result.fail('Unit value must be greater than zero')
        }
        if (!Number.isInteger(value)) {
            return Result.fail('Unit value must be an integer')
        }
        return Result.ok(new ConversionFactor(value))
    }
}
