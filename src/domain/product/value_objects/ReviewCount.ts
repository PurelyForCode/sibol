import { Result } from '../../../types/utils/Result.js'
import { SingleValueObject } from '../../shared/SingleValueObject.js'

export class ReviewCount extends SingleValueObject<number> {
    private constructor(value: number) {
        super(value)
    }
    static create(value: number): Result<ReviewCount> {
        if (value < 0) {
            return Result.fail('Review count can not be less than 0')
        }
        if (!Number.isInteger(value)) {
            return Result.fail('Review count can not be a non integer')
        }
        return Result.ok(new ReviewCount(value))
    }

    static zero() {
        return new ReviewCount(0)
    }
}
