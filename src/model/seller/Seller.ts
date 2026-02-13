// separate the seller data from the authentication data that I need
// So basically i only really need credentials when creating the user and when I need to log them inside the application
export class Seller {
    private constructor(
        private id: string,
        private storeName: string,
        private storeSlug: string,
        private description: string | null,
        private rating: number | null,
        private totalSales: number,
        private isVerified: boolean,
        private isActive: boolean,
        private supportEmail: string | null,
        private supportPhone: string | null,
        private createdAt: Date,
        private updatedAt: Date,
    ) {}

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
}
