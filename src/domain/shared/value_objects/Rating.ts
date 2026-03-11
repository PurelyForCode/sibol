import { Result } from '../../../types/utils/Result.js'
import { SingleValueObject } from '../SingleValueObject.js'

export class Rating extends SingleValueObject<number> {
    private constructor(rating: number) {
        super(rating)
    }

    static create(rating: number): Result<Rating> {
        if (rating > 5 || rating < 0) {
            Result.fail('Rating can only be between 0-5')
        }
        return Result.ok(new Rating(rating))
    }
}
