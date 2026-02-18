import { UnitOfMeasurement } from './UnitOfMeasurement.js'

export class ProductUnit {
    private constructor(
        private _id: string,
        private _productId: string,
        private _sellUnit: UnitOfMeasurement,
        private _conversionFactor: number,
    ) {}

    static rehydrate(
        id: string,
        productId: string,
        sellUnit: UnitOfMeasurement,
        conversionFactor: number,
    ) {
        return new ProductUnit(id, productId, sellUnit, conversionFactor)
    }

    static new(
        id: string,
        productId: string,
        sellUnit: UnitOfMeasurement,
        conversionFactor: number,
    ) {
        return new ProductUnit(id, productId, sellUnit, conversionFactor)
    }

    public get conversionFactor(): number {
        return this._conversionFactor
    }
    public get sellUnit(): UnitOfMeasurement {
        return this._sellUnit
    }
    public get productId(): string {
        return this._productId
    }
    public get id(): string {
        return this._id
    }
}
