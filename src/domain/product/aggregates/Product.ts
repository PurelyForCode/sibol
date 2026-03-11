import { AggregateRoot } from '../../shared/AggregateRoot.js'
import { EntityId, Id } from '../../shared/EntityId.js'
import { Rating } from '../../shared/value_objects/Rating.js'
import { ProductImage } from '../entities/ProductImage.js'
import { UnitOfMeasurement } from '../../shared/value_objects/UnitOfMeasurement.js'
import { ProductDescription } from '../value_objects/ProductDescription.js'
import { ProductName } from '../value_objects/ProductName.js'
import { ProductStatus } from '../value_objects/ProductStatus.js'
import { Money } from '../../shared/value_objects/Money.js'
import { ImagePosition } from '../../shared/value_objects/ImagePosition.js'
import { ProductSellUnit } from '../entities/ProductSellUnit.js'
import { ProductSellUnitNotFoundException } from '../../../exceptions/product/ProductSellUnitNotFoundException.js'
import { ProductArchivedDomainEvent } from '../events/ProductArchivedDomainEvent.js'
import { SmallestUnitOfMeasurement } from '../../shared/value_objects/SmallestUnitOfMeasurement.js'
import { ProductStock } from '../value_objects/ProductStock.js'
import { ConversionFactor } from '../../shared/value_objects/ConversionFactor.js'
import { SellUnitDisplayName } from '../value_objects/SellUnitDisplayName.js'
import { ProductSellUnitAlreadyDefinedException } from '../../../exceptions/product/ProductSellUnitAlreadyDefinedException.js'
import { ProductHasInsufficientAvailableStockException } from '../../../exceptions/product/ProductHasInsufficientAvailableStockException.js'
import { ProductHasInsufficientReservedStockException } from '../../../exceptions/product/ProductHasInsufficientReservedStockException.js'
import { CanNotDiscontinueDefaultSellUnitException } from '../../../exceptions/product/CanNotDiscontinueDefaultSellUnitException.js'
import { SellUnitIsNotDefaultException } from '../../../exceptions/product/SellUnitIsNotDefaultException.js'
import { ImagePath } from '../../shared/value_objects/ImagePath.js'
import { InternalServerError } from '../../../exceptions/shared/InternalServerError.js'
import { ProductImageNotFoundException } from '../../../exceptions/product/ProductImageNotFoundException.js'

export class Product extends AggregateRoot {
    private constructor(
        id: EntityId,
        private _sellerId: EntityId,
        private _name: ProductName,
        private _description: ProductDescription | null,
        private _inventoryUnitSymbol: SmallestUnitOfMeasurement,
        private _status: ProductStatus,
        private _rating: Rating | null,
        private _images: Map<Id, ProductImage>,
        private _sellUnits: Map<Id, ProductSellUnit>,
        private _availableStock: ProductStock,
        private _reservedStock: ProductStock,
        private _createdAt: Date,
        private _updatedAt: Date,
        private _deletedAt: Date | null,
    ) {
        super(id)
    }

    sellReservedStock(stock: ProductStock) {
        const subtractionResult = this._reservedStock.subtract(stock)
        if (
            subtractionResult.isError() &&
            subtractionResult.getErrorType() === 'negativeStock'
        ) {
            throw new ProductHasInsufficientReservedStockException(
                this.id.value,
            )
        }
        this._reservedStock = subtractionResult.getValue()
    }

    assertHasSufficientStockForReservation(stockToReserve: ProductStock) {
        if (this.availableStock.value < stockToReserve.value) {
            throw new ProductHasInsufficientAvailableStockException(
                this.id.value,
            )
        }
    }

    getSellUnitById(sellUnitId: EntityId) {
        const sellUnit = this._sellUnits.get(sellUnitId.value)
        if (!sellUnit) {
            return null
        }
        return sellUnit
    }

    addSellUnit(
        id: EntityId,
        unitSymbol: UnitOfMeasurement,
        unitValue: ConversionFactor,
        pricePerUnit: Money,
        displayName: SellUnitDisplayName,
    ) {
        let isDefault = false
        if (this._sellUnits.size === 0) {
            isDefault = true
        }
        const sellUnit = ProductSellUnit.new(
            id,
            this.id,
            unitSymbol,
            unitValue,
            pricePerUnit,
            displayName,
            isDefault,
        )
        for (const [_key, value] of this._sellUnits) {
            if (
                value.conversionFactor.value ===
                    sellUnit.conversionFactor.value &&
                value.unitSymbol.value === sellUnit.unitSymbol.value
            ) {
                throw new ProductSellUnitAlreadyDefinedException(
                    sellUnit.unitSymbol.value,
                    this.id.value,
                )
            }
        }
        this._sellUnits.set(sellUnit.id.value, sellUnit)
    }

    activateIfSellUnitAndImageIsAvailable() {
        let hasImage = false
        if (this._images.size > 0) {
            hasImage = true
        }
        let hasDefaultSellUnit = false
        for (const [_, v] of this._sellUnits) {
            if (v.isDefault) {
                hasDefaultSellUnit = true
                break
            }
        }
        if (hasImage && hasDefaultSellUnit) {
            this._status = ProductStatus.active()
        }
    }

    discontinueSellUnit(sellUnitId: EntityId) {
        const sellUnit = this._sellUnits.get(sellUnitId.value)
        if (!sellUnit) {
            throw new ProductSellUnitNotFoundException(
                sellUnitId.value,
                this.id.value,
            )
        }
        if (sellUnit.isDefault) {
            throw new CanNotDiscontinueDefaultSellUnitException(
                sellUnit.id.value,
            )
        }
        this.activateIfSellUnitAndImageIsAvailable()
        sellUnit.discontinue()
    }

    replaceDefaultSellUnit(from: EntityId, to: EntityId) {
        const oldS = this._sellUnits.get(from.value)
        if (!oldS) {
            throw new ProductSellUnitNotFoundException(
                from.value,
                this.id.value,
            )
        }
        const newS = this._sellUnits.get(to.value)
        if (!newS) {
            throw new ProductSellUnitNotFoundException(to.value, this.id.value)
        }
        if (oldS.isDefault !== true) {
            throw new SellUnitIsNotDefaultException(
                oldS.id.value,
                this.id.value,
            )
        }
        oldS.toggleDefault()
        newS.toggleDefault()
    }

    addImage(id: EntityId, url: ImagePath) {
        const image = ProductImage.new(
            id,
            this.id,
            url,
            ImagePosition.create(this._images.size).getValue(),
            false,
            new Date(),
        )
        this._images.set(id.value, image)

        // if first image, set as thumbnail
        if (this._images.size === 1) {
            image.toggleThumbnail()
        }
    }

    swapImagePositions(image1: ProductImage, image2: ProductImage) {
        const temp = image1.position
        image1.moveTo(image2.position)
        image2.moveTo(temp)
    }

    setImageAsThumbnail(imageId: EntityId) {
        const thumbnail = this._images.get(imageId.value)

        if (!thumbnail) {
            throw new ProductImageNotFoundException(
                imageId.value,
                this.id.value,
            )
        }

        if (thumbnail.isThumbnail) {
            return
        }

        for (const img of this._images.values()) {
            if (img.isThumbnail) {
                img.toggleThumbnail()
                this.swapImagePositions(img, thumbnail)
                break
            }
        }
        thumbnail.toggleThumbnail()
    }

    removeImage(imageId: EntityId): ImagePath {
        const image = this._images.get(imageId.value)
        if (!image) {
            throw new ProductImageNotFoundException(
                imageId.value,
                this.id.value,
            )
        }
        const position = image.position.value
        // change positions
        for (const [_, v] of this._images) {
            if (v.position.value > position) {
                v.moveTo(ImagePosition.create(v.position.value - 1).getValue())
            }
        }
        this._images.delete(imageId.value)

        // if removed was thumbnail, change the first image into the thumbnail
        if (image.isThumbnail) {
            if (this._images.size === 0) {
                // deactive cause thumbnail
                this.deactivate()
            }
            for (const i of this._images.values()) {
                if (i.position.value === 0) {
                    i.toggleThumbnail()
                }
            }
        }
        return image.url
    }

    private deactivate() {
        this._status = ProductStatus.inactive()
        this._updatedAt = new Date()
    }

    private activate() {}

    changeImagePositions(
        input: { imageId: EntityId; position: ImagePosition }[],
    ) {
        for (const v of input) {
            const image = this._images.get(v.imageId.value)
            if (!image) {
                throw new ProductImageNotFoundException(
                    v.imageId.value,
                    this.id.value,
                )
            }
            image.moveTo(v.position)
        }
    }

    changeName(name: ProductName) {
        this._updatedAt = new Date()
        this._name = name
    }

    changeDescription(description: ProductDescription | null) {
        this._updatedAt = new Date()
        this._description = description
    }

    changeAvailableStock(stock: ProductStock) {
        this._updatedAt = new Date()
        this._availableStock = stock
    }

    changeReservedStock(stock: ProductStock) {
        this._updatedAt = new Date()
        this._reservedStock = stock
    }

    reserve(stock: ProductStock) {
        const availableStockResult = this._availableStock.subtract(stock)
        if (
            availableStockResult.isError() &&
            availableStockResult.getErrorType() === 'negativeStock'
        ) {
            throw new ProductHasInsufficientAvailableStockException(
                this.id.value,
            )
        }
        this._availableStock = availableStockResult.getValue()
        this._reservedStock = this._reservedStock.add(stock)
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
        unit: SmallestUnitOfMeasurement,
    ) {
        const now = new Date()

        return new Product(
            id,
            sellerId,
            name,
            description,
            unit,
            ProductStatus.inactive(),
            null,
            new Map(),
            new Map(),
            ProductStock.zero(),
            ProductStock.zero(),
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
        unit: SmallestUnitOfMeasurement,
        status: ProductStatus,
        rating: Rating | null,
        images: Map<Id, ProductImage>,
        sellUnits: Map<Id, ProductSellUnit>,
        availableStock: ProductStock,
        reservedStock: ProductStock,
        createdAt: Date,
        updatedAt: Date,
        deletedAt: Date | null,
    ) {
        return new Product(
            id,
            sellerId,
            name,
            description,
            unit,
            status,
            rating,
            images,
            sellUnits,
            availableStock,
            reservedStock,
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
    public get description(): ProductDescription | null {
        return this._description
    }
    public get name(): ProductName {
        return this._name
    }
    public get sellerId(): EntityId {
        return this._sellerId
    }
    public get inventoryUnitSymbol(): SmallestUnitOfMeasurement {
        return this._inventoryUnitSymbol
    }
    public get status(): ProductStatus {
        return this._status
    }
    public get sellUnits(): Map<Id, ProductSellUnit> {
        return this._sellUnits
    }
    public get images(): Map<Id, ProductImage> {
        return this._images
    }
    public get availableStock(): ProductStock {
        return this._availableStock
    }
    public get reservedStock(): ProductStock {
        return this._reservedStock
    }
}
