import { SingleValueObject } from '../../lib/domain/SingleValueObject.js'
import { Result } from '../../lib/utils/Result.js'

export class ReviewMessage extends SingleValueObject<string> {
    private constructor(value: string) {
        super(value)
    }
    static create(value: string): Result<ReviewMessage> {
        if (value.length < 5) {
            return Result.fail('Review must be longer than 5 characters')
        }
        return Result.ok(new ReviewMessage(value))
    }
}
