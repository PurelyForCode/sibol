import { SingleValueObject } from '../../../lib/domain/SingleValueObject.js'
import { Result } from '../../../lib/utils/Result.js'

export class Username extends SingleValueObject<string> {
    private constructor(username: string) {
        super(username)
    }

    static create(usernameStr: string): Result<Username> {
        if (usernameStr.length > 32 || usernameStr.length < 3) {
            return Result.fail('Username must be between 3-32 characters')
        }
        const username = new Username(usernameStr)
        return Result.ok(username)
    }
}
