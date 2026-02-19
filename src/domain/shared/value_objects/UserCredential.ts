import { EntityId } from '../../../lib/domain/EntityId.js'
import { Email } from './Email.js'
import { HashedPassword } from './HashedPassword.js'

export class UserCredential {
    private constructor(
        private readonly _id: EntityId,
        private readonly _email: Email,
        private readonly _passwordHash: HashedPassword,
    ) {}

    static create(id: EntityId, email: Email, passwordHash: HashedPassword) {
        return new UserCredential(id, email, passwordHash)
    }

    public get passwordHash(): HashedPassword {
        return this._passwordHash
    }
    public get email(): Email {
        return this._email
    }
    public get id(): EntityId {
        return this._id
    }
}
