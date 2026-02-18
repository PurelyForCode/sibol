import { SingleValueObject } from '../../../lib/domain/SingleValueObject.js'
import { Result } from '../../../lib/utils/Result.js'

export class UnitOfMeasurement extends SingleValueObject<string> {
    private constructor(value: string) {
        super(value)
    }

    static create(value: string): Result<UnitOfMeasurement> {
        if (!['kg', 'g', 'lbs', 'l', 'ml', 'pcs'].includes(value)) {
            return Result.fail('Invalid unit of measurement')
        }
        return Result.ok(new UnitOfMeasurement(value))
    }
}
