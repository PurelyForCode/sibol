import { SingleValueObject } from '../../../../../lib/SingleValueObject.js'
import { Result } from '../../../../../lib/utils/Result.js'

export class TotalOrders extends SingleValueObject<number> {
    private constructor(value: number) {
        super(value)
    }

    static create(value: number) {
        if (!Number.isInteger(value)) {
            Result.fail('Total orders must be an integer')
        }
        if (value < 0) {
            Result.fail('Total orders must not be less than zero')
        }
        const totalOrders = new TotalOrders(value)
        return Result.ok(totalOrders)
    }
}
