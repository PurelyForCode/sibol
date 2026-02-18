import { SingleValueObject } from '../../../lib/domain/SingleValueObject.js'
import { Result } from '../../../lib/utils/Result.js'

export class ProductDescription extends SingleValueObject<string> {
    private constructor(value: string) {
        super(value)
    }

    public static create(description: string): Result<ProductDescription> {
        return Result.ok(new ProductDescription(description))
    }
}
