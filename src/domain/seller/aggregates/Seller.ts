import { SellerIsBannedException } from '../../../exceptions/seller/SellerIsBannedException.js'
import { SellerIsUnverifiedException } from '../../../exceptions/seller/SellerIsUnverifiedException.js'
import { AggregateRoot } from '../../shared/AggregateRoot.js'
import { EntityId } from '../../shared/EntityId.js'
import { Product } from '../../product/aggregates/Product.js'
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
        id: EntityId,
        private _addressId: EntityId,
        private _storeName: StoreName,
        private _storeSlug: StoreSlug,
        private _description: SellerDescription | null,
        private _rating: Rating | null,
        private _totalSales: TotalSales,
        private _isVerified: boolean,
        private _isBanned: boolean,
        private _supportEmail: Email | null,
        private _supportPhone: MobilePhoneNumber | null,
        private _createdAt: Date,
        private _updatedAt: Date,
    ) {
        super(id)
    }

    assertIsVerified(): void {
        if (!this.isVerified) {
            throw new SellerIsUnverifiedException(this.id.value)
        }
    }

    assertIsUnbanned(): void {
        if (this.isBanned) {
            throw new SellerIsBannedException(this.id.value)
        }
    }

    canPerformActionOnProduct(product: Product) {
        if (!this.isBanned || !this.isVerified) {
            return false
        }
        if (!product.sellerId.equals(this.id)) {
            return false
        }

        return true
    }
    verify() {
        this._isVerified = true
    }

    deactivate() {
        this._isBanned = false
    }

    activate() {
        this._isBanned = true
    }

    static new(
        id: EntityId,
        addressId: EntityId,
        storeName: StoreName,
        storeSlug: StoreSlug,
        description: SellerDescription | null,
        supportEmail: Email | null,
        supportPhone: MobilePhoneNumber | null,
    ) {
        const now = new Date()
        const seller = new Seller(
            id,
            addressId,
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
        addressId: EntityId,
        storeName: StoreName,
        storeSlug: StoreSlug,
        description: SellerDescription | null,
        rating: Rating | null,
        totalSales: TotalSales,
        isVerified: boolean,
        isBanned: boolean,
        supportEmail: Email | null,
        supportPhone: MobilePhoneNumber | null,
        createdAt: Date,
        updatedAt: Date,
    ) {
        return new Seller(
            id,
            addressId,
            storeName,
            storeSlug,
            description,
            rating,
            totalSales,
            isVerified,
            isBanned,
            supportEmail,
            supportPhone,
            createdAt,
            updatedAt,
        )
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
    public get isBanned(): boolean {
        return this._isBanned
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
    public get addressId(): EntityId {
        return this._addressId
    }
}
