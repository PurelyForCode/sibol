import { hash as argonHash, verify as argonVerify } from 'argon2'
import { PasswordUtil } from '../../domain/shared/interfaces/PasswordUtil.js'
import { HashedPassword } from '../../domain/shared/value_objects/HashedPassword.js'
import { RawPassword } from '../../domain/shared/value_objects/RawPassword.js'

export class ArgonPasswordUtil implements PasswordUtil {
    async hash(raw: RawPassword): Promise<HashedPassword> {
        return HashedPassword.create(await argonHash(raw.value)).getValue()
    }

    async verify(raw: RawPassword, hashed: HashedPassword): Promise<boolean> {
        return await argonVerify(hashed.value, raw.value)
    }
}
