import { SingleValueObject } from '../../../lib/domain/SingleValueObject.js'
import { Result } from '../../../lib/utils/Result.js'

export class MobilePhoneNumber extends SingleValueObject<string> {
    private static readonly E164_REGEX = /^\+[1-9]\d{1,14}$/

    private constructor(value: string) {
        super(value)
    }

    public static create(phone: string): Result<MobilePhoneNumber> {
        if (!phone) {
            return Result.fail('Mobile phone number is required')
        }

        const normalized = phone.trim().replace(/[\s\-().]/g, '')

        if (!normalized.startsWith('+')) {
            return Result.fail('Mobile phone number must include country code')
        }

        if (!this.E164_REGEX.test(normalized)) {
            return Result.fail('Invalid mobile phone number format')
        }

        return Result.ok(new MobilePhoneNumber(normalized))
    }
}
