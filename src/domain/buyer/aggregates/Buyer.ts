import { EntityId } from '../../../lib/domain/EntityId.js'
import { Email } from '../../shared/value_objects/Email.js'
import { Username } from '../../shared/value_objects/Username.js'

export class Buyer {
    private constructor(
        private _id: EntityId,
        private _username: Username,
        private _isVerified: boolean,
        private _isActive: boolean,
        private _createdAt: Date,
        private _updatedAt: Date,
    ) {}

    static new(id: EntityId, username: Username) {
        const now = new Date()
        return new Buyer(id, username, false, false, now, now)
    }

    static rehydrate(
        id: EntityId,
        username: Username,
        isVerified: boolean,
        isActive: boolean,
        createdAt: Date,
        updatedAt: Date,
    ) {
        return new Buyer(
            id,
            username,
            isVerified,
            isActive,
            createdAt,
            updatedAt,
        )
    }

    public get id(): EntityId {
        return this._id
    }
    public get username(): Username {
        return this._username
    }
    public get isVerified(): boolean {
        return this._isVerified
    }
    public get isActive(): boolean {
        return this._isActive
    }
    public get createdAt(): Date {
        return this._createdAt
    }
    public get updatedAt(): Date {
        return this._updatedAt
    }
}
