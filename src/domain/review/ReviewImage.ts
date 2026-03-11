import { Entity } from '../shared/Entity.js'
import { EntityId } from '../shared/EntityId.js'
import { ImagePath } from '../shared/value_objects/ImagePath.js'
import { ImagePosition } from '../shared/value_objects/ImagePosition.js'

export class ReviewImage extends Entity {
    private constructor(
        id: EntityId,
        private _reviewId: EntityId,
        private _url: ImagePath,
        private _position: ImagePosition,
    ) {
        super(id)
    }

    moveTo(position: ImagePosition) {
        this._position = position
    }

    static new(
        id: EntityId,
        reviewId: EntityId,
        url: ImagePath,
        position: ImagePosition,
    ) {
        return new ReviewImage(id, reviewId, url, position)
    }

    static rehydrate(
        id: EntityId,
        reviewId: EntityId,
        url: ImagePath,
        position: ImagePosition,
    ) {
        return new ReviewImage(id, reviewId, url, position)
    }

    public get position(): ImagePosition {
        return this._position
    }
    public get url(): ImagePath {
        return this._url
    }
    public get reviewId(): EntityId {
        return this._reviewId
    }
}
