export class User {
    constructor(
        private id: string,
        private email: string,
        private passwordHash: string,
        private createdAt: Date,
        private updateDate: Date,
        private bannedAt: Date | null,
    ) {}
}
