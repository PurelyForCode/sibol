import { SingleValueObject } from '../../../lib/domain/SingleValueObject.js'
import { Result } from '../../../lib/utils/Result.js'

export class ProductStock extends SingleValueObject<number> {
    private constructor(value: number) {
        super(value)
    }

    static create(stock: number): Result<ProductStock> {
        if (stock < 0) {
            return Result.fail('Product stock can not reach negative')
        }
        if (!Number.isInteger(stock)) {
            return Result.fail('Product stock is not an integer')
        }
        return Result.ok(new ProductStock(stock))
    }

    static zero() {
        return new ProductStock(0)
    }
}
