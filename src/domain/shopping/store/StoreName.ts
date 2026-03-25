import { SingleValueObject } from '../../shared/SingleValueObject.js'
import { Result } from '../../../types/utils/Result.js'

export class StoreName extends SingleValueObject<string> {
    private constructor(value: string) {
        super(value)
    }

    public static create(value: string): Result<StoreName> {
        if (value.length > 100) {
            return Result.fail(
                'Store name can not be longer than 100 characters',
            )
        }
        return Result.ok(new StoreName(value))
    }
}
