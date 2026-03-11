// TODO: Add review count
export type ProductDto = {
    id: string
    sellerId: string
    name: string
    description: string | null
    inventoryUnitSymbol: string
    availableStock: number
    reservedStock: number
    rating: number | null
    reviewCount: number
    defaultPricePerUnit: number
    defaultUnitDisplayName: string
    status: string
    imageUrl: string
    sellerAddress: string | null
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
}
