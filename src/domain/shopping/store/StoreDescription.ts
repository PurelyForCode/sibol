import { SingleValueObject } from '../../shared/SingleValueObject.js'
import { Result } from '../../../types/utils/Result.js'

export class StoreDescription extends SingleValueObject<string> {
    private constructor(value: string) {
        super(value)
    }

    public static create(description: string): Result<StoreDescription> {
        return Result.ok(new StoreDescription(description))
    }
}
