import { SingleValueObject } from '../SingleValueObject.js'
import { Result } from '../../../types/utils/Result.js'

export class Money extends SingleValueObject<number> {
    private constructor(value: number) {
        super(value)
    }

    static create(value: number): Result<Money> {
        if (value < 0) {
            return Result.fail('Money amount can not be a negative value')
        }

        return Result.ok(new Money(value))
    }
}
