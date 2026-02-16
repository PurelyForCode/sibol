import { EmailService } from '../interfaces/EmailService.js'

export class FakeEmailService implements EmailService {
    async message(to: string, title: string, body: string): Promise<void> {
        console.log('body')
    }
}
