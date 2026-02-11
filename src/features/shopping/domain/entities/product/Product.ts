import { EntityId } from '../../../../../lib/EntityId.js'
import { Money } from './Money.js'
import { ProductDescription } from './ProductDescription.js'
import { ProductName } from './ProductName.js'
import { Rating } from '../../../../shared/value_objects/Rating.js'
import { ProductStock } from './ProductStock.js'
import { UnitOfMeasurement } from './UnitOfMeasurement.js'

export class Product {
    changeName(name: ProductName) {
        this._updatedAt = new Date()
        this._name = name
    }

    changeDescription(description: ProductDescription | null) {
        this._updatedAt = new Date()
        this._description = description
    }

    updateStock(stock: ProductStock) {
        this._updatedAt = new Date()
        this._stock = stock
    }

    updateUnitOfMeasurement(unit: UnitOfMeasurement) {
        this._updatedAt = new Date()
        this._unit = unit
    }

    updatePrice(price: Money) {
        this._updatedAt = new Date()
        this._pricePerUnit = price
    }

    archive() {
        this._deletedAt = new Date()
    }

    private constructor(
        private _id: EntityId,
        private _sellerId: EntityId,
        private _name: ProductName,
        private _description: ProductDescription | null,
        private _stock: ProductStock,
        private _unit: UnitOfMeasurement,
        private _pricePerUnit: Money,
        private _rating: Rating | null,
        private _createdAt: Date,
        private _updatedAt: Date,
        private _deletedAt: Date | null,
    ) {}

    static create(
        id: EntityId,
        sellerId: EntityId,
        name: ProductName,
        description: ProductDescription | null,
        stock: ProductStock,
        unit: UnitOfMeasurement,
        pricePerUnit: Money,
        rating: Rating | null,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date | null,
    ) {
        return new Product(
            id,
            sellerId,
            name,
            description,
            stock,
            unit,
            pricePerUnit,
            rating,
            createdAt,
            updatedAt,
            deletedAt,
        )
    }

    public get deletedAt(): Date | null {
        return this._deletedAt
    }
    public get updatedAt(): Date {
        return this._updatedAt
    }
    public get createdAt(): Date {
        return this._createdAt
    }
    public get rating(): Rating | null {
        return this._rating
    }
    public get pricePerUnit(): Money {
        return this._pricePerUnit
    }
    public get unit(): UnitOfMeasurement {
        return this._unit
    }
    public get stock(): ProductStock {
        return this._stock
    }
    public get description(): ProductDescription | null {
        return this._description
    }
    public get name(): ProductName {
        return this._name
    }
    public get sellerId(): EntityId {
        return this._sellerId
    }
    public get id(): EntityId {
        return this._id
    }
}
