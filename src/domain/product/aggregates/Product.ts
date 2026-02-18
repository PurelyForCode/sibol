import { AggregateRoot } from '../../../lib/domain/AggregateRoot.js'
import { EntityId } from '../../../lib/domain/EntityId.js'
import { Rating } from '../../shared/value_objects/Rating.js'
import { ProductImage } from '../ProductImage.js'
import { UnitOfMeasurement } from '../../shared/value_objects/UnitOfMeasurement.js'
import { ProductDescription } from '../value_objects/ProductDescription.js'
import { ProductName } from '../value_objects/ProductName.js'
import { ProductStock } from '../value_objects/ProductStock.js'
import { ProductStatus } from '../value_objects/ProductStatus.js'
import { Money } from '../../shared/value_objects/Money.js'

export class Product extends AggregateRoot {
    private constructor(
        private _id: EntityId,
        private _sellerId: EntityId,
        private _name: ProductName,
        private _description: ProductDescription | null,
        private _stockQuantity: ProductStock,
        private _baseUnit: UnitOfMeasurement,
        private _status: ProductStatus,
        private _rating: Rating | null,
        private _images: ProductImage[],
        private units: any[],
        private _createdAt: Date,
        private _updatedAt: Date,
        private _deletedAt: Date | null,
    ) {
        super()
    }

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
        this._stockQuantity = stock
    }

    archive() {
        this._deletedAt = new Date()
    }

    static new(
        id: EntityId,
        sellerId: EntityId,
        name: ProductName,
        description: ProductDescription | null,
        unit: UnitOfMeasurement,
        pricePerUnit: Money,
    ) {
        const now = new Date()

        return new Product(
            id,
            sellerId,
            name,
            description,
            ProductStock.zero(),
            unit,
            ProductStatus.active(),
            null,
            [],
            [],
            now,
            now,
            null,
        )
    }

    static rehydrate(
        id: EntityId,
        sellerId: EntityId,
        name: ProductName,
        description: ProductDescription | null,
        stock: ProductStock,
        unit: UnitOfMeasurement,
        status: ProductStatus,
        rating: Rating | null,
        images: ProductImage[],
        units: any[],
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
            status,
            rating,
            images,
            units,
            createdAt,
            updatedAt,
            deletedAt,
        )
    }

    public get images(): ProductImage[] {
        return this._images
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
    public get stock(): ProductStock {
        return this._stockQuantity
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
    public get baseUnit(): UnitOfMeasurement {
        return this._baseUnit
    }

    public get status(): ProductStatus {
        return this._status
    }
}
