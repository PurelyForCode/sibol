import { SingleValueObject } from '../../../lib/domain/SingleValueObject.js'
import { Result } from '../../../lib/utils/Result.js'

export class TotalSales extends SingleValueObject<number> {
    private constructor(value: number) {
        super(value)
    }

    static create(totalSales: number): Result<TotalSales> {
        if (totalSales < 0) {
            return Result.fail('Total sales can not be less than 0')
        }
        return Result.ok(new TotalSales(totalSales))
    }
}
