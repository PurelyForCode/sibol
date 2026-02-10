import { SingleValueObject } from '../../../lib/SingleValueObject.js'

export class Rating extends SingleValueObject<number> {
    private constructor(rating: number) {
        super(rating)
    }

    static create(rating: number) {
        if (rating > 5 && rating < 0) {
            throw new Error('Rating can only be between 0-5')
        }
        return new Rating(rating)
    }
}
