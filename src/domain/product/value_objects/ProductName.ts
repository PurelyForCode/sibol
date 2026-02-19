import { SingleValueObject } from '../../../lib/domain/SingleValueObject.js'
import { Result } from '../../../lib/utils/Result.js'

export class ProductName extends SingleValueObject<string> {
    private constructor(value: string) {
        super(value)
    }

    static create(name: string): Result<ProductName> {
        if (name.length === 100 || name.length < 3) {
            Result.fail(
                `Invalid product name length, must be between 3-100 characters`,
            )
        }
        return Result.ok(new ProductName(name))
    }
}
