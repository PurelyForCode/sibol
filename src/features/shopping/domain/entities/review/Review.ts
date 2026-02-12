import { EntityId } from '../../../../../lib/EntityId.js'
import { Rating } from '../../../../shared/value_objects/Rating.js'
import { ReviewImage } from './ReviewImage.js'
import { ReviewMessage } from './ReviewMessage.js'

export class Review {
    private constructor(
        private _id: EntityId,
        private _buyerId: EntityId,
        private _message: ReviewMessage | null,
        private _rating: Rating,
        private _images: ReviewImage[],
        private _createdAt: Date,
        private _updatedAt: Date,
    ) {}

    static rehydrate(
        id: EntityId,
        buyerId: EntityId,
        message: ReviewMessage | null,
        rating: Rating,
        images: ReviewImage[],
        createdAt: Date,
        updatedAt: Date,
    ) {
        return new Review(
            id,
            buyerId,
            message,
            rating,
            images,
            createdAt,
            updatedAt,
        )
    }

    static create(
        id: EntityId,
        buyerId: EntityId,
        message: ReviewMessage | null,
        rating: Rating,
        images: ReviewImage[],
        createdAt: Date,
        updatedAt: Date,
    ) {
        return new Review(
            id,
            buyerId,
            message,
            rating,
            images,
            createdAt,
            updatedAt,
        )
    }

    changeMessage(message: ReviewMessage | null) {
        this._message = message
    }

    changeRating(rating: Rating) {
        this._rating = rating
    }

    public get images(): ReviewImage[] {
        return this._images
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
    public get id(): EntityId {
        return this._id
    }
}
