import { AggregateRoot } from '../../shared/AggregateRoot.js'
import { EntityId } from '../../shared/EntityId.js'
import { ComplaintContent } from '../../shared/value_objects/ComplaintContent.js'
import {
    ProductComplaintStatus,
    ProductComplaintStatusEnum,
} from '../value_objects/ProductComplaintStatus.js'
import {
    SellerComplaintStatus,
    SellerComplaintStatusEnum,
} from '../value_objects/SellerComplaintStatus.js'
import { SellerComplaintType } from '../value_objects/SellerComplaintType.js'

export class SellerComplaint extends AggregateRoot {
    private constructor(
        id: EntityId,
        private _productId: EntityId,
        private _authorId: EntityId,
        private _reviewerId: EntityId | null,
        private _content: ComplaintContent,
        private _status: SellerComplaintStatus,
        private _type: SellerComplaintType,
        private _createdAt: Date,
        private _updatedAt: Date,
    ) {
        super(id)
    }

    static rehydrate(
        id: EntityId,
        productId: EntityId,
        authorId: EntityId,
        reviewerId: EntityId | null,
        content: ComplaintContent,
        status: SellerComplaintStatus,
        type: SellerComplaintType,
        createdAt: Date,
        updatedAt: Date,
    ) {
        return new SellerComplaint(
            id,
            productId,
            authorId,
            reviewerId,
            content,
            status,
            type,
            createdAt,
            updatedAt,
        )
    }

    static new(
        id: EntityId,
        productId: EntityId,
        authorId: EntityId,
        content: ComplaintContent,
        type: SellerComplaintType,
    ) {
        const now = new Date()
        return new SellerComplaint(
            id,
            productId,
            authorId,
            null,
            content,
            SellerComplaintStatus.create(SellerComplaintStatusEnum.In_Review),
            type,
            now,
            now,
        )
    }

    public get updatedAt(): Date {
        return this._updatedAt
    }
    public get createdAt(): Date {
        return this._createdAt
    }
    public get type(): SellerComplaintType {
        return this._type
    }
    public get status(): SellerComplaintStatus {
        return this._status
    }
    public get content(): ComplaintContent {
        return this._content
    }
    public get reviewerId(): EntityId | null {
        return this._reviewerId
    }
    public get authorId(): EntityId {
        return this._authorId
    }
    public get productId(): EntityId {
        return this._productId
    }
}
