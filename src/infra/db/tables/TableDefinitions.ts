export type AccountRow = {
    id: string
    email: string
    password_hash: string
    created_at: Date
    updated_at: Date
    banned_at: Date | null
}

export type BuyerRow = {
    id: string
    username: string
    is_verified: boolean
    is_active: boolean
    created_at: Date
    updated_at: Date
}

export type SellerRow = {
    id: string
    store_name: string
    store_slug: string
    description: string | null
    rating: number | null
    total_sales: number
    is_verified: boolean
    is_active: boolean
    support_email: string | null
    support_phone: string | null
    created_at: Date
    updated_at: Date
}
export type ProductRow = {
    id: string
    seller_id: string
    name: string
    description: string | null
    stock_quantity: number
    base_unit: string
    rating: number | null
    status: string
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
}
