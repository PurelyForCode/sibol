export class Seller {
    private constructor(
        private _id: string,
        private _storeName: string,
        private _storeSlug: string,
        private _description: string | null,
        private _rating: number | null,
        private _totalSales: number,
        private _isVerified: boolean,
        private _isActive: boolean,
        private _supportEmail: string | null,
        private _supportPhone: string | null,
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

    static new(
        id: string,
        storeName: string,
        storeSlug: string,
        description: string | null,
        supportEmail: string | null,
        supportPhone: string | null,
    ) {
        const now = new Date()
        return new Seller(
            id,
            storeName,
            storeSlug,
            description,
            null,
            0,
            false,
            true,
            supportEmail,
            supportPhone,
            now,
            now,
        )
    }

    static rehydrate(
        id: string,
        storeName: string,
        storeSlug: string,
        description: string | null,
        rating: number | null,
        totalSales: number,
        isVerified: boolean,
        isActive: boolean,
        supportEmail: string | null,
        supportPhone: string | null,
        createdAt: Date,
        updatedAt: Date,
    ) {
        return new Seller(
            id,
            storeName,
            storeSlug,
            description,
            rating,
            totalSales,
            isVerified,
            isActive,
            supportEmail,
            supportPhone,
            createdAt,
            updatedAt,
        )
    }

    public get updatedAt(): Date {
        return this._updatedAt
    }
    public get createdAt(): Date {
        return this._createdAt
    }
    public get supportPhone(): string | null {
        return this._supportPhone
    }
    public get supportEmail(): string | null {
        return this._supportEmail
    }
    public get isActive(): boolean {
        return this._isActive
    }
    public get isVerified(): boolean {
        return this._isVerified
    }
    public get totalSales(): number {
        return this._totalSales
    }
    public get rating(): number | null {
        return this._rating
    }
    public get description(): string | null {
        return this._description
    }
    public get storeSlug(): string {
        return this._storeSlug
    }
    public get storeName(): string {
        return this._storeName
    }
    public get id(): string {
        return this._id
    }
}
