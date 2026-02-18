import { AggregateRoot } from '../../../lib/domain/AggregateRoot.js'
import { EntityId } from '../../../lib/domain/EntityId.js'
import { Email } from '../../shared/value_objects/Email.js'
import { HashedPassword } from '../../shared/value_objects/HashedPassword.js'

export class Account extends AggregateRoot {
    constructor(
        private _id: EntityId,
        private _email: Email,
        private _password: HashedPassword,
        private _createdAt: Date,
        private _updatedAt: Date,
        private _bannedAt: Date | null,
    ) {
        super()
    }

    static new(id: EntityId, email: Email, password: HashedPassword) {
        const now = new Date()
        return new Account(id, email, password, now, now, null)
    }

    static rehydrate(
        id: EntityId,
        email: Email,
        password: HashedPassword,
        createdAt: Date,
        updatedAt: Date,
        bannedAt: Date | null,
    ) {
        return new Account(id, email, password, createdAt, updatedAt, bannedAt)
    }
    unban() {
        this._bannedAt = null
        this._updatedAt = new Date()
    }

    ban() {
        const now = new Date()
        this._bannedAt = now
        this._updatedAt = now
    }

    changePassword(password: HashedPassword) {
        this._password = password
        this._updatedAt = new Date()
    }

    changeEmail(email: Email) {
        this._email = email
        this._updatedAt = new Date()
    }

    public get bannedAt(): Date | null {
        return this._bannedAt
    }
    public get updatedAt(): Date {
        return this._updatedAt
    }
    public get createdAt(): Date {
        return this._createdAt
    }
    public get password(): HashedPassword {
        return this._password
    }
    public get email(): Email {
        return this._email
    }
    public get id(): EntityId {
        return this._id
    }
}
