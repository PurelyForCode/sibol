import { SingleValueObject } from '../../shared/SingleValueObject.js'
import { Result } from '../../../types/utils/Result.js'

export class SellUnitDisplayName extends SingleValueObject<string> {
    private constructor(value: string) {
        super(value)
    }
    static create(value: string): Result<SellUnitDisplayName> {
        if (!value) {
            return Result.fail('Sell unit display name can not be empty')
        }
        if (value.length === 0) {
            return Result.fail('Sell unit display name can not be empty')
        }
        return Result.ok(new SellUnitDisplayName(value))
    }
}
