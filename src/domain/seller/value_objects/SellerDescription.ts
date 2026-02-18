import { SingleValueObject } from '../../../lib/domain/SingleValueObject.js'
import { Result } from '../../../lib/utils/Result.js'

export class SellerDescription extends SingleValueObject<string> {
    private constructor(value: string) {
        super(value)
    }

    public static create(description: string): Result<SellerDescription> {
        return Result.ok(new SellerDescription(description))
    }
}
