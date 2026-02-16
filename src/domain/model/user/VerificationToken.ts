export enum VerificationTokenType {
    'BUYER_VERIFY',
    'SELLER_VERIFY',
    'EMAIL_CHANGE',
    'PASSWORD_RESET',
}

// TODO: MAke this more robust
export class VerificationToken {
    private constructor(
        private _id: string,
        private _userId: string,
        private _code: number,
        private _type: VerificationTokenType,
        private _expiresAt: Date,
        private _usedAt: Date | null,
        private _createdAt: Date,
    ) {}

    static generate(id: string, userId: string, type: VerificationTokenType) {
        const now = new Date()
        const expiresAt = new Date()
        expiresAt.setTime(expiresAt.getTime() + 1000 * 60 * 5)
        const randomCode = 123456
        return new VerificationToken(
            id,
            userId,
            randomCode,
            type,
            expiresAt,
            null,
            now,
        )
    }

    use() {
        this._usedAt = new Date()
    }

    public get createdAt(): Date {
        return this._createdAt
    }
    public get usedAt(): Date | null {
        return this._usedAt
    }
    public get expiresAt(): Date {
        return this._expiresAt
    }
    public get type(): VerificationTokenType {
        return this._type
    }
    public get code(): number {
        return this._code
    }
    public get userId(): string {
        return this._userId
    }
    public get id(): string {
        return this._id
    }
}
