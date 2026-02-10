export type ProductDto = {
    id: string
    sellerId: string
    name: string
    description: string | null
    stock: number
    unitOfMeasure: string
    unitValue: number
    pricePerUnit: number
    rating: number | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
}
