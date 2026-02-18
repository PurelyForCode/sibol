import { SingleValueObject } from '../../../lib/domain/SingleValueObject.js'
import { Result } from '../../../lib/utils/Result.js'

export class HashedPassword extends SingleValueObject<string> {
    private constructor(value: string) {
        super(value)
    }

    static create(hash: string): Result<HashedPassword> {
        return Result.ok(new HashedPassword(hash))
    }
}
