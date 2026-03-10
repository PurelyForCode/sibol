import { SingleValueObject } from '../../shared/SingleValueObject.js'
import { Result } from '../../../types/utils/Result.js'

export class ProductStatus extends SingleValueObject<
    'archived' | 'active' | 'banned' | 'inactive'
> {
    private constructor(value: 'archived' | 'active' | 'banned' | 'inactive') {
        super(value)
    }

    static active() {
        return new ProductStatus('active')
    }

    static inactive() {
        return new ProductStatus('inactive')
    }

    static archived() {
        return new ProductStatus('archived')
    }

    static banned() {
        return new ProductStatus('banned')
    }

    static create(value: string): Result<ProductStatus> {
        if (
            !(
                value === 'archived' ||
                value === 'active' ||
                value === 'banned' ||
                value === 'inactive'
            )
        ) {
            return Result.fail('Invalid product status')
        }
        return Result.ok(new ProductStatus(value))
    }
}
