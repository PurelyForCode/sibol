import { SingleValueObject } from '../../../lib/domain/SingleValueObject.js'
import { Result } from '../../../lib/utils/Result.js'

export class ConversionFactor extends SingleValueObject<number> {
    private constructor(value: number) {
        super(value)
    }

    static create(value: number) {
        if (value < 0) {
            return Result.fail('Conversion factor can not be negative')
        }

        if (value === 0) {
            return Result.fail('Conversion factor can not be zero')
        }

        return Result.ok(new ConversionFactor(value))
    }

    //  add convenience methods for converting between stuff like kg to g or lbs
}
