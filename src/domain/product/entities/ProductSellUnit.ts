import { EntityId } from '../../shared/EntityId.js'
import { ConversionFactor } from '../../shared/value_objects/ConversionFactor.js'
import { Money } from '../../shared/value_objects/Money.js'
import { SellUnitDisplayName } from '../value_objects/SellUnitDisplayName.js'
import { Entity } from '../../shared/Entity.js'
import { Quantity } from '../../shared/value_objects/Quantity.js'
import { ProductStock } from '../value_objects/ProductStock.js'

export class ProductSellUnit extends Entity {
    private constructor(
        id: EntityId,
        private _productId: EntityId,
        private _conversionFactor: ConversionFactor,
        private _pricePerUnit: Money,
        private _displayName: SellUnitDisplayName,
        private _discontinuedAt: Date | null,
        private _isDefault: boolean,
    ) {
        super(id)
    }

    // convert from the quantity to base product stock
    convertQuantityToProductStock(quantity: Quantity): ProductStock {
        return ProductStock.create(
            this._conversionFactor.value * quantity.value,
        ).getValue()
    }

    changeDisplayName(displayName: SellUnitDisplayName) {
        this._displayName = displayName
    }

    changePricePerUnit(pricePerUnit: Money) {
        this._pricePerUnit = pricePerUnit
    }

    discontinue() {
        this._discontinuedAt = new Date()
        this._isDefault = false
    }

    setDefault(value: boolean) {
        this._isDefault = value
    }

    static rehydrate(
        id: EntityId,
        productId: EntityId,
        conversionFactor: ConversionFactor,
        pricePerUnit: Money,
        displayName: SellUnitDisplayName,
        discontinuedAt: Date | null,
        isDefault: boolean,
    ) {
        return new ProductSellUnit(
            id,
            productId,
            conversionFactor,
            pricePerUnit,
            displayName,
            discontinuedAt,
            isDefault,
        )
    }

    static new(
        id: EntityId,
        productId: EntityId,
        conversionFactor: ConversionFactor,
        pricePerUnit: Money,
        displayName: SellUnitDisplayName,
        isDefault: boolean,
    ) {
        return new ProductSellUnit(
            id,
            productId,
            conversionFactor,
            pricePerUnit,
            displayName,
            null,
            isDefault,
        )
    }

    public get productId(): EntityId {
        return this._productId
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
    public get isDefault(): boolean {
        return this._isDefault
    }
}
