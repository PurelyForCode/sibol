import { Id } from '../../../core/interfaces/IdGenerator.js'
import { ProductImage } from './ProductImage.js'
import { ProductUnit } from './ProductUnit.js'
import { ProductStatus } from './ProductStatus.js'
import { UnitOfMeasurement } from './UnitOfMeasurement.js'
import { ProductUnitNotFoundException } from '../../../exceptions/products/ProductUnitNotFoundException.js'

export class Product {
    private constructor(
        private _id: string,
        private _sellerId: string,
        private _name: string,
        private _description: string | null,
        private _stockQuantity: number,
        private _baseUnit: UnitOfMeasurement,
        private _rating: string | null,
        private _status: ProductStatus,
        private _createdAt: Date,
        private _updatedAt: Date,
        private _deletedAt: Date | null,
        private images: Map<Id, ProductImage>,
        private units: Map<Id, ProductUnit>,
    ) {}

    addImage(image: ProductImage) {}
    removeImage(imageId: string) {}
    changeImageIndex(imageId: string, idx: number) {}

    addUnit(unit: ProductUnit) {
        this.units.set(unit.id, unit)
    }
    removeUnit(unitId: string): boolean {
        return this.units.delete(unitId)
    }
    changeUnit(unitId: string, sellUnit: UnitOfMeasurement) {
        const unit = this.units.get(unitId)
        if (!unit) {
            throw new ProductUnitNotFoundException(this.id, unitId)
        }
        unit.sellUnit
    }
    changeUnitConversionFactor(unitId: string, conversionFactor: number) {}

    changeName(name: string) {
        this._name = name
        this._updatedAt = new Date()
    }

    changeDescription(description: string | null) {
        this._description = description
        this._updatedAt = new Date()
    }

    archive() {
        const now = new Date()
        this._deletedAt = now
        this._updatedAt = now
    }

    static new(
        id: string,
        sellerId: string,
        name: string,
        description: string | null,
        baseUnit: UnitOfMeasurement,
    ) {
        const now = new Date()
        return new Product(
            id,
            sellerId,
            name,
            description,
            0,
            baseUnit,
            null,
            ProductStatus.ACTIVE,
            now,
            now,
            null,
            new Map(),
            new Map(),
        )
    }

    static rehydrate(
        id: string,
        sellerId: string,
        name: string,
        description: string | null,
        stockQuantity: number,
        baseUnit: UnitOfMeasurement,
        rating: string | null,
        status: ProductStatus,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date | null,
    ) {
        return new Product(
            id,
            sellerId,
            name,
            description,
            stockQuantity,
            baseUnit,
            rating,
            status,
            createdAt,
            updatedAt,
            deletedAt,
        )
    }

    public get id(): string {
        return this._id
    }
    public get sellerId(): string {
        return this._sellerId
    }
    public get name(): string {
        return this._name
    }
    public get description(): string | null {
        return this._description
    }
    public get stockQuantity(): number {
        return this._stockQuantity
    }
    public get baseUnit(): UnitOfMeasurement {
        return this._baseUnit
    }
    public get rating(): string | null {
        return this._rating
    }
    public get status(): ProductStatus {
        return this._status
    }
    public get createdAt(): Date {
        return this._createdAt
    }
    public get updatedAt(): Date {
        return this._updatedAt
    }
    public get deletedAt(): Date | null {
        return this._deletedAt
    }
}
