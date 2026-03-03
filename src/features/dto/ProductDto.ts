export type ProductDto = {
    id: string
    sellerId: string
    name: string
    description: string | null
    inventoryUnitSymbol: string
    availableStock: number
    reservedStock: number
    rating: number | null
    status: string
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
}
