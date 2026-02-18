import { SingleValueObject } from '../../../lib/domain/SingleValueObject.js'
import { Result } from '../../../lib/utils/Result.js'

export class RawPassword extends SingleValueObject<string> {
    private constructor(value: string) {
        super(value)
    }

    static create(value: string): Result<RawPassword> {
        const trimmed = value.trim()
        if (trimmed.length < 8) {
            return Result.fail('Password must be at least 8 characters')
        }
        return Result.ok(new RawPassword(trimmed))
    }
}
