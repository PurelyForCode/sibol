export type SellerUserRow = {
    id: string
    email: string
    updated_at: Date
    created_at: Date
    store_name: string
    rating: number | null
    total_sales: number
    banned_at: Date | null
}
