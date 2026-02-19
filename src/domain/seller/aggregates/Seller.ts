import { AggregateRoot } from '../../../lib/domain/AggregateRoot.js'
import { EntityId } from '../../../lib/domain/EntityId.js'
import { Email } from '../../shared/value_objects/Email.js'
import { MobilePhoneNumber } from '../../shared/value_objects/MobilePhoneNumber.js'
import { Rating } from '../../shared/value_objects/Rating.js'
import { SellerRegisteredDomainEvent } from '../events/SellerRegisteredDomainEvent.js'
import { SellerDescription } from '../value_objects/SellerDescription.js'
import { StoreName } from '../value_objects/StoreName.js'
import { StoreSlug } from '../value_objects/StoreSlug.js'
import { TotalSales } from '../value_objects/TotalSales.js'

export class Seller extends AggregateRoot {
    private constructor(
        private _id: EntityId,
        private _storeName: StoreName,
        private _storeSlug: StoreSlug,
        private _description: SellerDescription | null,
        private _rating: Rating | null,
        private _totalSales: TotalSales,
        private _isVerified: boolean,
        private _isActive: boolean,
        private _supportEmail: Email | null,
        private _supportPhone: MobilePhoneNumber | null,
        private _createdAt: Date,
        private _updatedAt: Date,
    ) {
        super()
    }

    verify() {
        this._isVerified = true
    }

    deactivate() {
        this._isActive = false
    }

    activate() {
        this._isActive = true
    }

    static new(
        id: EntityId,
        storeName: StoreName,
        storeSlug: StoreSlug,
        description: SellerDescription | null,
        supportEmail: Email | null,
        supportPhone: MobilePhoneNumber | null,
    ) {
        const now = new Date()
        const seller = new Seller(
            id,
            storeName,
            storeSlug,
            description,
            null,
            TotalSales.zero(),
            false,
            true,
            supportEmail,
            supportPhone,
            now,
            now,
        )
        seller.addEvent(new SellerRegisteredDomainEvent(seller.id.value))
        return seller
    }

    static rehydrate(
        id: EntityId,
        storeName: StoreName,
        storeSlug: StoreSlug,
        description: SellerDescription | null,
        rating: Rating | null,
        totalSales: TotalSales,
        isVerified: boolean,
        isActive: boolean,
        supportEmail: Email | null,
        supportPhone: MobilePhoneNumber | null,
        createdAt: Date,
        updatedAt: Date,
    ) {
        return new Seller(
            id,
            storeName,
            storeSlug,
            description,
            rating,
            totalSales,
            isVerified,
            isActive,
            supportEmail,
            supportPhone,
            createdAt,
            updatedAt,
        )
    }

    public get id(): EntityId {
        return this._id
    }
    public get storeName(): StoreName {
        return this._storeName
    }
    public get storeSlug(): StoreSlug {
        return this._storeSlug
    }
    public get description(): SellerDescription | null {
        return this._description
    }
    public get rating(): Rating | null {
        return this._rating
    }
    public get totalSales(): TotalSales {
        return this._totalSales
    }
    public get isVerified(): boolean {
        return this._isVerified
    }
    public get isActive(): boolean {
        return this._isActive
    }
    public get supportEmail(): Email | null {
        return this._supportEmail
    }
    public get supportPhone(): MobilePhoneNumber | null {
        return this._supportPhone
    }
    public get createdAt(): Date {
        return this._createdAt
    }
    public get updatedAt(): Date {
        return this._updatedAt
    }
}
