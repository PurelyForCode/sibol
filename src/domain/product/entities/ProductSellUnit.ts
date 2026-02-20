import { EntityId } from '../../../lib/domain/EntityId.js'
import { ConversionFactor } from '../../shared/value_objects/ConversionFactor.js'
import { UnitOfMeasurement } from '../../shared/value_objects/UnitOfMeasurement.js'

export class ProductSellUnit {
    private constructor(
        private _id: EntityId,
        private _productId: EntityId,
        private _unit: UnitOfMeasurement,
        private _conversionFactor: ConversionFactor,
    ) {}

    changeUnit(unit: UnitOfMeasurement) {
        this._unit = unit
    }

    changeConversionFactor(conversionFactor: ConversionFactor) {
        this._conversionFactor = conversionFactor
    }

    static rehydrate(
        id: EntityId,
        productId: EntityId,
        unit: UnitOfMeasurement,
        conversionFactor: ConversionFactor,
    ) {
        return new ProductSellUnit(id, productId, unit, conversionFactor)
    }

    static new(
        id: EntityId,
        productId: EntityId,
        unit: UnitOfMeasurement,
        conversionFactor: ConversionFactor,
    ) {
        return new ProductSellUnit(id, productId, unit, conversionFactor)
    }

    public get conversionFactor(): ConversionFactor {
        return this._conversionFactor
    }
    public get unit(): UnitOfMeasurement {
        return this._unit
    }
    public get productId(): EntityId {
        return this._productId
    }
    public get id(): EntityId {
        return this._id
    }
}
