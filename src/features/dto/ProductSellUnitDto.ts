export type ProductSellUnitDto = {
    id: string
    productId: string
    conversionFactor: number
    unitSymbol: string
    pricePerUnit: number
    displayName: string
    discontinuedAt: Date | null
}
