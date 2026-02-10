import { EntityId } from '../../../../../lib/EntityId.js'
import { Rating } from '../../../../shared/value_objects/Rating.js'
import { Email } from '../Email.js'
import { StoreName } from './StoreName.js'
import { TotalSales } from './TotalSales.js'

export class Seller {
    private constructor(
        private _id: EntityId,
        private _email: Email,
        private _storeName: StoreName,
        private _rating: Rating | null,
        private _totalSales: TotalSales,
        private _createdAt: Date,
        private _updatedAt: Date,
        private _bannedAt: Date | null,
    ) {}

    static create(
        id: EntityId,
        email: Email,
        storeName: StoreName,
        rating: Rating | null,
        totalSales: TotalSales,
        createdAt: Date,
        updatedAt: Date,
        bannedAt: Date | null,
    ) {
        return new Seller(
            id,
            email,
            storeName,
            rating,
            totalSales,
            createdAt,
            updatedAt,
            bannedAt,
        )
    }

    public get totalSales(): TotalSales {
        return this._totalSales
    }
    public set totalSales(value: TotalSales) {
        this._totalSales = value
    }
    public get rating(): Rating | null {
        return this._rating
    }
    public set rating(value: Rating | null) {
        this._rating = value
    }
    public get storeName(): StoreName {
        return this._storeName
    }
    public set storeName(value: StoreName) {
        this._storeName = value
    }
    public get email(): Email {
        return this._email
    }
    public set email(value: Email) {
        this._email = value
    }
    public get id(): EntityId {
        return this._id
    }
    public set id(value: EntityId) {
        this._id = value
    }
    public get updatedAt(): Date {
        return this._updatedAt
    }
    public set updatedAt(value: Date) {
        this._updatedAt = value
    }
    public get createdAt(): Date {
        return this._createdAt
    }
    public set createdAt(value: Date) {
        this._createdAt = value
    }
    public get bannedAt(): Date | null {
        return this._bannedAt
    }
    public set bannedAt(value: Date | null) {
        this._bannedAt = value
    }
}
