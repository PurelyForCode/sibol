import { SingleValueObject } from '../../../lib/domain/SingleValueObject.js'
import { Result } from '../../../lib/utils/Result.js'

export class StoreSlug extends SingleValueObject<string> {
    private constructor(value: string) {
        super(value)
    }

    static create(value: string): Result<StoreSlug> {
        const trimmed = value.trim()

        if (trimmed.length === 0) {
            return Result.fail('Store name cannot be empty')
        }

        if (trimmed.length > 100) {
            return Result.fail(
                'Store name cannot be longer than 100 characters',
            )
        }

        return Result.ok(new StoreSlug(trimmed))
    }
}
