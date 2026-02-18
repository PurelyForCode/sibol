import { SingleValueObject } from '../../../lib/domain/SingleValueObject.js'
import { Result } from '../../../lib/utils/Result.js'

export class Email extends SingleValueObject<string> {
    private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    private constructor(email: string) {
        super(email)
    }

    public static create(email: string): Result<Email> {
        if (!email) {
            Result.fail('Email is required')
        }

        const normalized = email.trim().toLowerCase()

        if (normalized.length > 255) {
            Result.fail('Email must be less than 255 characters')
        }

        if (!this.EMAIL_REGEX.test(normalized)) {
            Result.fail('Invalid email formakt')
        }

        return Result.ok(new Email(normalized))
    }
}
