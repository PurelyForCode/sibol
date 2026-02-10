import { RawPassword } from '../../features/account/domain/entities/RawPassword.js'
import { HashedPassword } from '../../features/account/domain/entities/HashedPassword.js'

export interface PasswordHasher {
    hash(raw: RawPassword): Promise<HashedPassword>
    verify(raw: RawPassword, hashed: HashedPassword): Promise<boolean>
}
