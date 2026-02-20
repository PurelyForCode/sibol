import { EntityId } from '../../../lib/domain/EntityId.js'
import { ImagePath } from '../../shared/value_objects/ImagePath.js'
import { ImagePosition } from '../../shared/value_objects/ImagePosition.js'

export class ProductImage {
    private constructor(
        private _id: EntityId,
        private _url: ImagePath,
        private _position: ImagePosition,
        private _createdAt: Date,
    ) {}

    changeUrl(url: ImagePath) {
        this._url = url
    }

    moveTo(position: ImagePosition) {
        this._position = position
    }

    static new(
        id: EntityId,
        url: ImagePath,
        position: ImagePosition,
        createdAt: Date,
    ) {
        return new ProductImage(id, url, position, createdAt)
    }

    static rehydrate(
        id: EntityId,
        url: ImagePath,
        position: ImagePosition,
        createdAt: Date,
    ) {
        return new ProductImage(id, url, position, createdAt)
    }

    public get createdAt(): Date {
        return this._createdAt
    }
    public get position(): ImagePosition {
        return this._position
    }
    public get url(): ImagePath {
        return this._url
    }
    public get id(): EntityId {
        return this._id
    }
}
