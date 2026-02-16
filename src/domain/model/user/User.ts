export class User {
    static new(id: string, email: string, passwordHash: string) {
        const now = new Date()
        return new User(id, email, passwordHash, now, now, null)
    }

    static rehydrate(
        id: string,
        email: string,
        passwordHash: string,
        createdAt: Date,
        updateDate: Date,
        bannedAt: Date | null,
    ) {
        return new User(
            id,
            email,
            passwordHash,
            createdAt,
            updateDate,
            bannedAt,
        )
    }

    private constructor(
        private _id: string,
        private _email: string,
        private _passwordHash: string,
        private _createdAt: Date,
        private _updateDate: Date,
        private _bannedAt: Date | null,
    ) {}

    public get bannedAt(): Date | null {
        return this._bannedAt
    }
    public get updateDate(): Date {
        return this._updateDate
    }
    public get createdAt(): Date {
        return this._createdAt
    }
    public get passwordHash(): string {
        return this._passwordHash
    }
    public get email(): string {
        return this._email
    }
    public get id(): string {
        return this._id
    }
}
