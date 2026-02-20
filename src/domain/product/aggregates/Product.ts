import { AggregateRoot } from '../../../lib/domain/AggregateRoot.js'
import { EntityId, Id } from '../../../lib/domain/EntityId.js'
import { Rating } from '../../shared/value_objects/Rating.js'
import { ProductImage } from '../entities/ProductImage.js'
import { UnitOfMeasurement } from '../../shared/value_objects/UnitOfMeasurement.js'
import { ProductDescription } from '../value_objects/ProductDescription.js'
import { ProductName } from '../value_objects/ProductName.js'
import { ProductStock } from '../value_objects/ProductStock.js'
import { ProductStatus } from '../value_objects/ProductStatus.js'
import { Money } from '../../shared/value_objects/Money.js'
import { ConversionFactor } from '../../shared/value_objects/ConversionFactor.js'
import { ImagePosition } from '../../shared/value_objects/ImagePosition.js'
import { ProductSellUnit } from '../entities/ProductSellUnit.js'
import { ProductSellUnitAlreadyDefinedException } from '../../../exceptions/product/ProductSellUnitAlreadyDefinedException.js'
import { ProductSellUnitNotFoundException } from '../../../exceptions/product/ProductSellUnitNotFoundException.js'
import { ProductSellUnitIsNotConvertibleException } from '../../../exceptions/product/ProductSellUnitIsNotConvertibleException.js'
import { ProductArchivedDomainEvent } from '../events/ProductArchivedDomainEvent.js'

export class Product extends AggregateRoot {
    private constructor(
        private _id: EntityId,
        private _sellerId: EntityId,
        private _name: ProductName,
        private _description: ProductDescription | null,
        private _stockQuantity: ProductStock,
        private _baseUnit: UnitOfMeasurement,
        private _pricePerUnit: Money,
        private _status: ProductStatus,
        private _rating: Rating | null,
        private _images: Map<Id, ProductImage>,
        private _sellUnits: Map<Id, ProductSellUnit>,
        private _createdAt: Date,
        private _updatedAt: Date,
        private _deletedAt: Date | null,
    ) {
        super()
    }

    addSellUnit(id: EntityId, unit: UnitOfMeasurement) {
        for (const [_, value] of this._sellUnits) {
            if (value.unit.value === unit.value) {
                throw new ProductSellUnitAlreadyDefinedException(
                    unit.value,
                    this.id.value,
                )
            }
        }

        if (!unit.isConvertibleTo(this._baseUnit)) {
            throw new ProductSellUnitIsNotConvertibleException(
                unit.value,
                this.id.value,
            )
        }
        const conversionFactor = ConversionFactor.fromTo(
            this._baseUnit,
            unit,
        ).getValue()

        const sellUnit = ProductSellUnit.new(
            id,
            this.id,
            unit,
            conversionFactor,
        )

        this._sellUnits.set(sellUnit.id.value, sellUnit)
    }

    removeSellUnit(sellUnitId: EntityId) {
        if (!this._sellUnits.delete(sellUnitId.value)) {
            throw new ProductSellUnitNotFoundException(
                sellUnitId.value,
                this.id.value,
            )
        }
    }

    changeSellUnitUnit(sellUnitId: EntityId, unit: UnitOfMeasurement) {
        const sellUnit = this._sellUnits.get(sellUnitId.value)
        if (!sellUnit) {
            throw new ProductSellUnitNotFoundException(
                sellUnitId.value,
                this.id.value,
            )
        }
        sellUnit.changeUnit(unit)
    }

    changeSellUnitConversionFactor(
        sellUnitId: EntityId,
        conversionFactor: ConversionFactor,
    ) {
        const sellUnit = this._sellUnits.get(sellUnitId.value)
        if (!sellUnit) {
            throw new ProductSellUnitNotFoundException(
                sellUnitId.value,
                this.id.value,
            )
        }
        sellUnit.changeConversionFactor(conversionFactor)
    }

    addImage(image: ProductImage) {}
    removeImage(imageId: EntityId) {}
    changeImagePosition(imageId: EntityId, position: ImagePosition) {}

    changePricePerUnit(price: Money) {
        this._pricePerUnit = price
        this._updatedAt = new Date()
    }

    changeBaseUnit(unit: UnitOfMeasurement) {
        this._baseUnit = unit
        this._updatedAt = new Date()
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
        this.addEvent(new ProductArchivedDomainEvent(this.id.value))
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
            pricePerUnit,
            ProductStatus.active(),
            null,
            new Map(),
            new Map(),
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
        pricePerUnit: Money,
        status: ProductStatus,
        rating: Rating | null,
        images: Map<Id, ProductImage>,
        sellUnits: Map<Id, ProductSellUnit>,
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
            status,
            rating,
            images,
            sellUnits,
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
    public get pricePerUnit(): Money {
        return this._pricePerUnit
    }
    public get sellUnits(): Map<Id, ProductSellUnit> {
        return this._sellUnits
    }
}
