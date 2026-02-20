export type ProductDto = {
    id: string
    sellerId: string
    name: string
    description: string | null
    stockQuantity: number
    baseUnit: string
    pricePerUnit: number
    rating: number | null
    status: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
}
