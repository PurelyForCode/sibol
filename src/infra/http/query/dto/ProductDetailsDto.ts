export type ProductDetailsDto = {
    id: string
    sellerId: string
    name: string
    description: string | null
    inventoryUnitSymbol: string
    availableStock: number
    reservedStock: number
    rating: number | null
    reviewCount: number
    status: string
    sellerAddress: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
    images: {
        id: string
        url: string
        position: number
        isThumbnail: boolean
    }[]
    sellUnits: {
        id: string
        pricePerUnit: number
        displayName: string
        isDefault: boolean
        unitSymbol: string
    }[]
}
