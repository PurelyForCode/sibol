import { EntityId } from '../../../../../lib/EntityId.js'
import { Email } from '../Email.js'
import { Username } from '../Username.js'
import { TotalOrders } from './TotalOrders.js'

export class Buyer {
    private constructor(
        private _id: EntityId,
        private _email: Email,
        private _username: Username,
        private _isVerified: boolean,
        private _totalOrders: TotalOrders,
        private _bannedAt: Date | null,
        private _createdAt: Date,
        private _updatedAt: Date,
    ) {}

    static create(
        id: EntityId,
        email: Email,
        username: Username,
        isVerified: boolean,
        totalOrders: TotalOrders,
        bannedAt: Date | null,
        createdAt: Date,
        updatedAt: Date,
    ) {
        return new Buyer(
            id,
            email,
            username,
            isVerified,
            totalOrders,
            bannedAt,
            createdAt,
            updatedAt,
        )
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
    public get totalOrders(): TotalOrders {
        return this._totalOrders
    }
    public set totalOrders(value: TotalOrders) {
        this._totalOrders = value
    }
    public get isVerified(): boolean {
        return this._isVerified
    }
    public set isVerified(value: boolean) {
        this._isVerified = value
    }
    public get username(): Email {
        return this._username
    }
    public set username(value: Email) {
        this._username = value
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
}
