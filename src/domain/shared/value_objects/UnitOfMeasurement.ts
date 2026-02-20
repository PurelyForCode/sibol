import { SingleValueObject } from '../../../lib/domain/SingleValueObject.js'
import { Result } from '../../../lib/utils/Result.js'

export type UnitOfMeasurementValues =
    | 'kg'
    | 'g'
    | 'lbs'
    | 'l'
    | 'ml'
    | 'pcs'
    | 'm'
    | 'cm'

export type MeasurementDimension = 'mass' | 'volume' | 'count' | 'distance'

export class UnitOfMeasurement extends SingleValueObject<UnitOfMeasurementValues> {
    private constructor(value: UnitOfMeasurementValues) {
        super(value)
    }

    static readonly unitValues: UnitOfMeasurementValues[] = [
        'kg',
        'g',
        'lbs',
        'l',
        'ml',
        'pcs',
        'm',
        'cm',
    ]

    static readonly dimensions: Record<
        UnitOfMeasurementValues,
        MeasurementDimension
    > = {
        kg: 'mass',
        g: 'mass',
        lbs: 'mass',

        l: 'volume',
        ml: 'volume',

        pcs: 'count',

        cm: 'distance',
        m: 'distance',
    }

    private static readonly allowedValues: UnitOfMeasurementValues[] = [
        'kg',
        'g',
        'lbs',
        'l',
        'ml',
        'pcs',
        'm',
        'cm',
    ]

    static create(value: string): Result<UnitOfMeasurement> {
        if (!value) {
            return Result.fail('Unit of measurement cannot be empty')
        }

        if (!this.allowedValues.includes(value as UnitOfMeasurementValues)) {
            return Result.fail(`Invalid unit of measurement: ${value}`)
        }

        return Result.ok(
            new UnitOfMeasurement(value as UnitOfMeasurementValues),
        )
    }

    isConvertibleTo(other: UnitOfMeasurement): boolean {
        if (this.value === other.value) return false

        return (
            UnitOfMeasurement.dimensions[this.value] ===
            UnitOfMeasurement.dimensions[other.value]
        )
    }
}
