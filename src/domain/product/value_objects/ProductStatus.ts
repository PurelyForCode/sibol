import { SingleValueObject } from '../../../lib/domain/SingleValueObject.js'
import { Result } from '../../../lib/utils/Result.js'

export class ProductStatus extends SingleValueObject<
    'archived' | 'active' | 'banned'
> {
    private constructor(value: 'archived' | 'active' | 'banned') {
        super(value)
    }

    static active() {
        return new ProductStatus('active')
    }

    static archived() {
        return new ProductStatus('archived')
    }

    static banned() {
        return new ProductStatus('banned')
    }

    static create(value: string): Result<ProductStatus> {
        if (
            !(value === 'archived' || value === 'active' || value === 'banned')
        ) {
            return Result.fail('Invalid product status')
        }
        return Result.ok(new ProductStatus(value))
    }
}
