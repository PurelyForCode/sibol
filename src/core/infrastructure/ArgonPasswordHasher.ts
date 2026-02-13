import { PasswordHasher } from '../interfaces/PasswordHasher.js'
import { hash as argonHash, verify as argonVerify } from 'argon2'

export class ArgonPasswordHasher implements PasswordHasher {
    constructor() {}

    async hash(raw: string): Promise<string> {
        return await argonHash(raw)
    }

    async verify(raw: string, hashed: string): Promise<boolean> {
        return await argonVerify(hashed, raw)
    }
}
