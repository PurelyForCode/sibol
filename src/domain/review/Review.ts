import { ReviewImageNotFoundException } from '../../exceptions/review/ReviewImageNotFoundException.js'
import { AggregateRoot } from '../shared/AggregateRoot.js'
import { EntityId } from '../shared/EntityId.js'
import { ImagePath } from '../shared/value_objects/ImagePath.js'
import { ImagePosition } from '../shared/value_objects/ImagePosition.js'
import { Rating } from '../shared/value_objects/Rating.js'
import { ReviewImage } from './ReviewImage.js'
import { ReviewMessage } from './ReviewMessage.js'

export class Review extends AggregateRoot {
    private constructor(
        id: EntityId,
        private _buyerId: EntityId,
        private _saleId: EntityId,
        private _message: ReviewMessage | null,
        private _rating: Rating,
        private _images: Map<string, ReviewImage>,
        private _createdAt: Date,
        private _updatedAt: Date,
    ) {
        super(id)
    }

    changeMessage(message: ReviewMessage | null) {
        this._message = message
    }

    changeRating(rating: Rating) {
        this._rating = rating
    }

    addImage(id: EntityId, url: ImagePath) {
        const image = ReviewImage.new(
            id,
            this.id,
            url,
            ImagePosition.create(this._images.size).getValue(),
        )
        this._images.set(id.value, image)
    }

    swapImagePositions(image1: ReviewImage, image2: ReviewImage) {
        const temp = image1.position
        image1.moveTo(image2.position)
        image2.moveTo(temp)
    }

    removeImage(imageId: EntityId) {
        const image = this._images.get(imageId.value)
        if (!image) {
            throw new ReviewImageNotFoundException(imageId.value, this.id.value)
        }
        const position = image.position.value
        // change positions
        for (const [_, v] of this._images) {
            if (v.position.value > position) {
                v.moveTo(ImagePosition.create(v.position.value - 1).getValue())
            }
        }
        this._images.delete(imageId.value)
    }

    static rehydrate(
        id: EntityId,
        buyerId: EntityId,
        saleId: EntityId,
        message: ReviewMessage | null,
        rating: Rating,
        images: Map<string, ReviewImage>,
        createdAt: Date,
        updatedAt: Date,
    ) {
        return new Review(
            id,
            buyerId,
            saleId,
            message,
            rating,
            images,
            createdAt,
            updatedAt,
        )
    }

    static new(
        id: EntityId,
        buyerId: EntityId,
        saleId: EntityId,
        message: ReviewMessage | null,
        rating: Rating,
        createdAt: Date,
        updatedAt: Date,
    ) {
        return new Review(
            id,
            buyerId,
            saleId,
            message,
            rating,
            new Map(),
            createdAt,
            updatedAt,
        )
    }

    public get updatedAt(): Date {
        return this._updatedAt
    }
    public get createdAt(): Date {
        return this._createdAt
    }
    public get rating(): Rating {
        return this._rating
    }
    public get message(): ReviewMessage | null {
        return this._message
    }
    public get buyerId(): EntityId {
        return this._buyerId
    }
    public get saleId(): EntityId {
        return this._saleId
    }
    public get images(): Map<string, ReviewImage> {
        return this._images
    }
}
