export type SellerDto = {
    id: string
    email: string
    storeName: string
    rating: number | null
    totalSales: number
    createdAt: Date
    updatedAt: Date
    bannedAt: Date
}
