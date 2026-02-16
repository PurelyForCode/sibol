export interface VerificationService {
    createVerification(userId: string, type: string): Promise<any>
}
