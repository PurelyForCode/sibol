import { SingleValueObject } from '../../shared/SingleValueObject.js'
import { Result } from '../../../types/utils/Result.js'

export class ProductStatus extends SingleValueObject<
    'archived' | 'active' | 'banned' | 'incomplete'
> {
    private constructor(
        value: 'archived' | 'active' | 'banned' | 'incomplete',
    ) {
        super(value)
    }

    static active() {
        return new ProductStatus('active')
    }

    static incomplete() {
        return new ProductStatus('incomplete')
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
                value === 'incomplete'
            )
        ) {
            return Result.fail('Invalid product status')
        }
        return Result.ok(new ProductStatus(value))
    }
}
