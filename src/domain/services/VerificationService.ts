import { EmailService } from '../../core/interfaces/EmailService.js'
import { VerificationToken } from '../model/user/VerificationToken.js'

export class VerificationService {
    constructor(private readonly emailService: EmailService) {}

    async sendVerificationToken(
        email: string,
        verificationToken: VerificationToken,
    ) {
        await this.emailService.message(
            email,
            'Verification Request',
            `This is your verification token ${verificationToken.code}`,
        )
    }

    async verify(code: number, token: VerificationToken) {
        if (
            code === token.code &&
            new Date().getUTCSeconds() < token.expiresAt.getUTCSeconds()
        ) {
            return true
        } else {
            return false
        }
    }
}
