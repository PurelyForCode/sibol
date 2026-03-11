export type ProductCatalogueItemDto = {
    id: string
    sellerId: string
    name: string
    rating: number | null
    reviewCount: number
    defaultPricePerUnit: number
    defaultUnitDisplayName: string
    imageUrl: string
    sellerAddress: string
}
