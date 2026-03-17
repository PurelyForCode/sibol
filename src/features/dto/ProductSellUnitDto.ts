export type ProductSellUnitDto = {
    id: string
    productId: string
    conversionFactor: number
    pricePerUnit: number
    displayName: string
    discontinuedAt: Date | null
}
