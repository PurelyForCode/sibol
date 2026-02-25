import { SingleValueObject } from '../../../lib/domain/SingleValueObject.js'
import { ValueObject } from '../../../lib/domain/ValueObject.js'
import { Result } from '../../../lib/utils/Result.js'

export type MeasurementDimension = 'mass' | 'volume' | 'count' | 'distance'

export type UnitOfMeasurementValues =
    | 'kg'
    | 'g'
    | 'l'
    | 'ml'
    | 'm'
    | 'cm'
    | 'pieces'

export class UnitOfMeasurement extends SingleValueObject<UnitOfMeasurementValues> {
    static create(value: string): Result<UnitOfMeasurement> {
        if (!value) {
            return Result.fail('Unit of measurement cannot be empty')
        }

        if (!this.unitValues.includes(value as UnitOfMeasurementValues)) {
            return Result.fail(`Invalid unit of measurement: ${value}`)
        }

        return Result.ok(
            new UnitOfMeasurement(value as UnitOfMeasurementValues),
        )
    }
    static readonly dimensions: Record<
        UnitOfMeasurementValues,
        MeasurementDimension
    > = {
        kg: 'mass',
        g: 'mass',

        l: 'volume',
        ml: 'volume',

        cm: 'distance',
        m: 'distance',

        pieces: 'count',
    }
    static readonly unitValues: UnitOfMeasurementValues[] = [
        'kg',
        'g',
        'l',
        'ml',
        'pieces',
        'm',
        'cm',
    ]
    private constructor(value: UnitOfMeasurementValues) {
        super(value)
    }

    isConvertibleTo(other: UnitOfMeasurement): boolean {
        return (
            UnitOfMeasurement.dimensions[this.value] ===
            UnitOfMeasurement.dimensions[other.value]
        )
    }
}
