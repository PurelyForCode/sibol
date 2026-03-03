import { SingleValueObject } from '../../shared/SingleValueObject.js'
import { Result } from '../../../types/utils/Result.js'

export class ProductStock extends SingleValueObject<number> {
    private constructor(value: number) {
        super(value)
    }

    add(stock: ProductStock) {
        // this never fails
        return ProductStock.create(this.value + stock.value).getValue()
    }

    subtract(stock: ProductStock): Result<ProductStock, 'negativeStock'> {
        return ProductStock.create(this.value - stock.value)
    }

    static create(stock: number): Result<ProductStock, 'negativeStock'> {
        if (stock < 0) {
            return Result.fail(
                'Product stock can not reach negative',
                'negativeStock',
            )
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
