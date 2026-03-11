import { Entity } from '../../shared/Entity.js'
import { EntityId } from '../../shared/EntityId.js'
import { ImagePath } from '../../shared/value_objects/ImagePath.js'
import { ImagePosition } from '../../shared/value_objects/ImagePosition.js'

export class ProductImage extends Entity {
    private constructor(
        id: EntityId,
        private _productId: EntityId,
        private _url: ImagePath,
        private _position: ImagePosition,
        private _isThumbnail: boolean,
        private _createdAt: Date,
    ) {
        super(id)
    }

    changeUrl(url: ImagePath) {
        this._url = url
    }

    moveTo(position: ImagePosition) {
        this._position = position
    }

    toggleThumbnail() {
        this._isThumbnail = !this._isThumbnail
    }

    static new(
        id: EntityId,
        productId: EntityId,
        url: ImagePath,
        position: ImagePosition,
        isThumbnail: boolean,
        createdAt: Date,
    ) {
        return new ProductImage(
            id,
            productId,
            url,
            position,
            isThumbnail,
            createdAt,
        )
    }

    static rehydrate(
        id: EntityId,
        productId: EntityId,
        url: ImagePath,
        position: ImagePosition,
        isThumbnail: boolean,
        createdAt: Date,
    ) {
        return new ProductImage(
            id,
            productId,
            url,
            position,
            isThumbnail,
            createdAt,
        )
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
    public get productId(): EntityId {
        return this._productId
    }
    public get isThumbnail(): boolean {
        return this._isThumbnail
    }
}
