import { EntityId } from '../../../lib/domain/EntityId.js'
import { ConversionFactor } from '../../shared/value_objects/UnitValue.js'
import { UnitOfMeasurement } from '../../shared/value_objects/UnitOfMeasurement.js'
import { Money } from '../../shared/value_objects/Money.js'
import { SellUnitDisplayName } from '../value_objects/SellUnitDisplayName.js'

export class ProductSellUnit {
    private constructor(
        private _id: EntityId,
        private _productId: EntityId,
        private _unitSymbol: UnitOfMeasurement,
        private _conversionFactor: ConversionFactor,
        private _pricePerUnit: Money,
        private _displayName: SellUnitDisplayName,
        private _discontinuedAt: Date | null,
    ) {}

    changeDisplayName(displayName: SellUnitDisplayName) {
        this._displayName = displayName
    }

    changePricePerUnit(pricePerUnit: Money) {
        this._pricePerUnit = pricePerUnit
    }

    discontinue() {
        this._discontinuedAt = new Date()
    }

    static rehydrate(
        id: EntityId,
        productId: EntityId,
        unitSymbol: UnitOfMeasurement,
        conversionFactor: ConversionFactor,
        pricePerUnit: Money,
        displayName: SellUnitDisplayName,
        discontinuedAt: Date,
    ) {
        return new ProductSellUnit(
            id,
            productId,
            unitSymbol,
            conversionFactor,
            pricePerUnit,
            displayName,
            discontinuedAt,
        )
    }

    static new(
        id: EntityId,
        productId: EntityId,
        unitSymbol: UnitOfMeasurement,
        conversionFactor: ConversionFactor,
        pricePerUnit: Money,
        displayName: SellUnitDisplayName,
    ) {
        return new ProductSellUnit(
            id,
            productId,
            unitSymbol,
            conversionFactor,
            pricePerUnit,
            displayName,
            null,
        )
    }

    public get unitSymbol(): UnitOfMeasurement {
        return this._unitSymbol
    }
    public get productId(): EntityId {
        return this._productId
    }
    public get id(): EntityId {
        return this._id
    }
    public get conversionFactor(): ConversionFactor {
        return this._conversionFactor
    }
    public get pricePerUnit(): Money {
        return this._pricePerUnit
    }
    public get displayName(): SellUnitDisplayName {
        return this._displayName
    }
    public get discontinuedAt(): Date | null {
        return this._discontinuedAt
    }
}
