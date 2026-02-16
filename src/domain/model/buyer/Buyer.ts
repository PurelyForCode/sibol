export class Buyer {
    constructor(
        private _id: string,
        private _username: string,
        private _isVerified: boolean,
        private _isActive: boolean,
        private _createdAt: Date,
        private _updatedAt: Date,
    ) {}

    verify() {
        this._isVerified = true
    }
    deactivate() {
        this._isActive = false
    }

    activate() {
        this._isActive = true
    }

    static rehydrate(
        id: string,
        username: string,
        isVerified: boolean,
        isActive: boolean,
        createdAt: Date,
        updatedAt: Date,
    ) {
        return new Buyer(
            id,
            username,
            isVerified,
            isActive,
            createdAt,
            updatedAt,
        )
    }
    static new(id: string, username: string) {
        const now = new Date()
        return new Buyer(id, username, false, true, now, now)
    }

    public get updatedAt(): Date {
        return this._updatedAt
    }
    public get createdAt(): Date {
        return this._createdAt
    }
    public get isActive(): boolean {
        return this._isActive
    }
    public get isVerified(): boolean {
        return this._isVerified
    }
    public get username(): string {
        return this._username
    }
    public get id(): string {
        return this._id
    }
}
