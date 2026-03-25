import { SellerIsBannedException } from '../../../../exceptions/seller/SellerIsBannedException.js'
import { SellerIsUnverifiedException } from '../../../../exceptions/seller/SellerIsUnverifiedException.js'
import { AggregateRoot } from '../../../shared/AggregateRoot.js'
import { EntityId } from '../../../shared/EntityId.js'
import { Product } from '../../../product/aggregates/Product.js'
import { SellerRegisteredDomainEvent } from '../events/SellerRegisteredDomainEvent.js'

export class Seller extends AggregateRoot {
    private constructor(
        id: EntityId,
        private _storeId: EntityId | null,
        private _firstName: string,
        private _middleInitial: string,
        private _lastName: string,
        private _isVerified: boolean,
        private _isBanned: boolean,
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

    unban() {
        this._isBanned = false
    }

    ban() {
        this._isBanned = true
    }

    static new(
        id: EntityId,
        firstName: string,
        middleInitial: string,
        lastName: string,
    ) {
        const now = new Date()

        const seller = new Seller(
            id,
            null,
            firstName,
            middleInitial,
            lastName,
            false,
            true,
            now,
            now,
        )

        seller.addEvent(new SellerRegisteredDomainEvent(seller.id.value))
        return seller
    }

    static rehydrate(
        id: EntityId,
        storeId: EntityId | null,
        firstName: string,
        middleInitial: string,
        lastName: string,
        isVerified: boolean,
        isBanned: boolean,
        createdAt: Date,
        updatedAt: Date,
    ) {
        return new Seller(
            id,
            storeId,
            firstName,
            middleInitial,
            lastName,
            isVerified,
            isBanned,
            createdAt,
            updatedAt,
        )
    }

    public get isVerified(): boolean {
        return this._isVerified
    }
    public get isBanned(): boolean {
        return this._isBanned
    }
    public get createdAt(): Date {
        return this._createdAt
    }
    public get updatedAt(): Date {
        return this._updatedAt
    }
    public get lastName(): string {
        return this._lastName
    }
    public get firstName(): string {
        return this._firstName
    }
    public get storeId(): EntityId | null {
        return this._storeId
    }
    public get middleInitial(): string {
        return this._middleInitial
    }
}
