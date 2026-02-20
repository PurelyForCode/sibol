import { SingleValueObject } from '../../../lib/domain/SingleValueObject.js'
import { Result } from '../../../lib/utils/Result.js'
import { UnitOfMeasurement } from './UnitOfMeasurement.js'

// Only mass, volume, and distance can be converted for now

export class ConversionFactor extends SingleValueObject<number> {
    private constructor(value: number) {
        super(value)
    }

    static create(value: number): Result<ConversionFactor> {
        if (value <= 0) {
            return Result.fail('Conversion factor must be greater than zero')
        }
        return Result.ok(new ConversionFactor(value))
    }

    private static readonly conversionTable: Record<
        string,
        Record<string, number>
    > = {
        // mass
        kg: { kg: 1, g: 1000, lbs: 2.2046226218 },
        g: { kg: 0.001, g: 1, lbs: 0.0022046226218 },
        lbs: { kg: 0.45359237, g: 453.59237, lbs: 1 },

        // distance
        m: { m: 1, cm: 100 },
        cm: { m: 0.01, cm: 1 },

        // volume
        l: { l: 1, ml: 1000 },
        ml: { l: 0.001, ml: 1 },
    }

    /**
     * Get a conversion factor between two units of measurement
     */
    static fromTo(
        from: UnitOfMeasurement,
        to: UnitOfMeasurement,
    ): Result<ConversionFactor> {
        // same unit → factor is 1
        if (from.value === to.value) return Result.ok(new ConversionFactor(1))

        // only allow conversion if they share the same dimension
        const fromDim = UnitOfMeasurement.dimensions[from.value]
        const toDim = UnitOfMeasurement.dimensions[to.value]

        if (fromDim !== toDim) {
            return Result.fail(
                `Cannot convert between different dimensions: ${from.value} → ${to.value}`,
            )
        }

        const factor = this.conversionTable[from.value]?.[to.value]
        if (!factor) {
            return Result.fail(
                `Unsupported conversion: ${from.value} → ${to.value}`,
            )
        }

        return Result.ok(new ConversionFactor(factor))
    }
}
