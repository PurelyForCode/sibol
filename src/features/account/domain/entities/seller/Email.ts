import { Result } from '../../../../../lib/utils/Result.js'
import { ValueObject } from '../../../../../lib/ValueObject.js'

export type EmailProps = {
    value: string
}

export class Email extends ValueObject<EmailProps> {
    private static readonly EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    private constructor(props: EmailProps) {
        super(props)
    }

    get value(): string {
        return this.props.value
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

        return Result.ok(new Email({ value: normalized }))
    }
}
