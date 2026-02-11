import { ValueObject } from "../../../../../lib/ValueObject.js"

// Dimensions (what is being measured)
export enum MeasurementType {
    WEIGHT = "WEIGHT",
    LENGTH = "LENGTH",
    VOLUME = "VOLUME",
    COUNT = "COUNT"
}

// Units
export enum UnitOfMeasure {
    // Weight
    KG = "KG",
    G = "G",
    LB = "LB",

    // Length
    M = "M",
    CM = "CM",
    IN = "IN",

    // Volume
    L = "L",
    ML = "ML",

    // Count
    PCS = "PCS"
}

type UnitMetadata = {
    type: MeasurementType
    toBaseFactor: number // convert to base unit of that type
}

// Base units:
// WEIGHT → KG
// LENGTH → M
// VOLUME → L
// COUNT → PCS

export const UNIT_DEFINITION: Record<UnitOfMeasure, UnitMetadata> = {
    // Weight
    KG: { type: MeasurementType.WEIGHT, toBaseFactor: 1 },
    G: { type: MeasurementType.WEIGHT, toBaseFactor: 0.001 },
    LB: { type: MeasurementType.WEIGHT, toBaseFactor: 0.453592 },

    // Length
    M: { type: MeasurementType.LENGTH, toBaseFactor: 1 },
    CM: { type: MeasurementType.LENGTH, toBaseFactor: 0.01 },
    IN: { type: MeasurementType.LENGTH, toBaseFactor: 0.0254 },

    // Volume
    L: { type: MeasurementType.VOLUME, toBaseFactor: 1 },
    ML: { type: MeasurementType.VOLUME, toBaseFactor: 0.001 },

    // Count
    PCS: { type: MeasurementType.COUNT, toBaseFactor: 1 }
}

interface UnitOfMeasurementProps {
    unit: UnitOfMeasure
    value: number
}

export class UnitOfMeasurement extends ValueObject<UnitOfMeasurementProps> {
    private constructor(props: UnitOfMeasurementProps) {
        super(props)
    }

    static create(unit: UnitOfMeasure, value: number) {
        if (value <= 0) {
            throw new Error("Measurement value must be greater than zero")
        }

        if (!UNIT_DEFINITION[unit]) {
            throw new Error(`Unsupported unit: ${unit}`)
        }

        return new UnitOfMeasurement({ unit, value })
    }

    get unit(): UnitOfMeasure {
        return this.props.unit
    }

    get value(): number {
        return this.props.value
    }

    get type(): MeasurementType {
        return UNIT_DEFINITION[this.unit].type
    }

    toBase(): number {
        const { toBaseFactor } = UNIT_DEFINITION[this.unit]
        return this.value * toBaseFactor
    }

    convertTo(targetUnit: UnitOfMeasure): UnitOfMeasurement {
        const sourceType = this.type
        const targetDef = UNIT_DEFINITION[targetUnit]

        if (targetDef.type !== sourceType) {
            throw new Error(`Cannot convert ${sourceType} to ${targetDef.type}`)
        }

        const baseValue = this.toBase()
        const targetValue = baseValue / targetDef.toBaseFactor

        return UnitOfMeasurement.create(targetUnit, targetValue)
    }
}
