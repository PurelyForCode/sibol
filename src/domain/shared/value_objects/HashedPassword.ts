import { SingleValueObject } from '../SingleValueObject.js'
import { Result } from '../../../types/utils/Result.js'

export class HashedPassword extends SingleValueObject<string> {
    private constructor(value: string) {
        super(value)
    }

    static create(hash: string): Result<HashedPassword> {
        return Result.ok(new HashedPassword(hash))
    }
}
