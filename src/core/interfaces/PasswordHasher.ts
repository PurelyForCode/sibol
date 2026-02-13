export interface PasswordHasher {
    hash(raw: string): Promise<string>
    verify(raw: string, hashed: string): Promise<boolean>
}
