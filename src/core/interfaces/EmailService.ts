export interface EmailService {
    message(to: string, title: string, body: string): Promise<void>
}
