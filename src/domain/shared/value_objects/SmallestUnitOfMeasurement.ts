import { SingleValueObject } from '../../../lib/domain/SingleValueObject.js'
import { ValueObject } from '../../../lib/domain/ValueObject.js'
import { Result } from '../../../lib/utils/Result.js'

export type SmallestUnitOfMeasurementValues = 'g' | 'ml' | 'cm' | 'pieces'

export class SmallestUnitOfMeasurement extends SingleValueObject<SmallestUnitOfMeasurementValues> {
    static readonly unitValues: SmallestUnitOfMeasurementValues[] = [
        'g',
        'ml',
        'pieces',
        'cm',
    ]

    private constructor(value: SmallestUnitOfMeasurementValues) {
        super(value)
    }

    static create(value: string): Result<SmallestUnitOfMeasurement> {
        if (!value) {
            return Result.fail('Unit of measurement cannot be empty')
        }

        if (
            !this.unitValues.includes(value as SmallestUnitOfMeasurementValues)
        ) {
            return Result.fail(`Invalid unit of measurement: ${value}`)
        }

        return Result.ok(
            new SmallestUnitOfMeasurement(
                value as SmallestUnitOfMeasurementValues,
            ),
        )
    }
}
