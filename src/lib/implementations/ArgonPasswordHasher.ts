import { HashedPassword } from '../../features/account/domain/entities/HashedPassword.js'
import { RawPassword } from '../../features/account/domain/entities/RawPassword.js'
import { PasswordHasher } from '../interfaces/PasswordHasher.js'
import { hash as argonHash, verify as argonVerify } from 'argon2'

export class ArgonPasswordHasher implements PasswordHasher {
    constructor() {}

    async hash(raw: RawPassword): Promise<HashedPassword> {
        return HashedPassword.create(await argonHash(raw.value))
    }

    async verify(raw: RawPassword, hashed: HashedPassword): Promise<boolean> {
        return await argonVerify(hashed.value, raw.value)
    }
}
