import { HashedPassword } from '../value_objects/HashedPassword.js'
import { RawPassword } from '../value_objects/RawPassword.js'

export interface PasswordUtil {
    hash(raw: RawPassword): Promise<HashedPassword>
    verify(raw: RawPassword, hashed: HashedPassword): Promise<boolean>
}
