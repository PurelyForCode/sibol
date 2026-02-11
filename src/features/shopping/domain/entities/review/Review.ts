import { EntityId } from '../../../../../lib/EntityId.js'
import { Rating } from '../../../../shared/value_objects/Rating.js'
import { ReviewMessage } from './ReviewMessage.js'

export class Review {
    private constructor(
        private _id: EntityId,
        private _buyerId: EntityId,
        private _message: ReviewMessage | null,
        private _rating: Rating,
        private _createdAt: Date,
        private _updatedAt: Date,
    ) {}

    static create(
        id: EntityId,
        buyerId: EntityId,
        message: ReviewMessage | null,
        rating: Rating,
        createdAt: Date,
        updatedAt: Date,
    ) {
        return new Review(id, buyerId, message, rating, createdAt, updatedAt)
    }

    changeMessage(message: ReviewMessage | null) {
        this._message = message
    }

    changeRating(rating: Rating) {
        this._rating = rating
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
