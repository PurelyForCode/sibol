export type OutboxRow = {
    id: string
    type: string
    payload: unknown
    occurred_at: Date
    processed_at: Date | null
}

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
    address_id: string
    username: string
    is_verified: boolean
    is_banned: boolean
    created_at: Date
    updated_at: Date
}

export type SellerRow = {
    id: string
    address_id: string
    store_name: string
    store_slug: string
    description: string | null
    rating: number | null
    total_sales: number
    is_verified: boolean
    is_banned: boolean
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
    inventory_unit_symbol: string
    rating: number | null
    status: string
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
}

export type SellUnitRow = {
    id: string
    product_id: string
    unit_symbol: string
    conversion_factor: number
    price_per_unit: number
    display_name: string
    discontinued_at: Date | null
}

export type InventoryMovementRow = {
    id: string
    product_id: string
    delta_quantity: number
    reason: string
    created_at: Date
}

export type ProductInventoryRow = {
    product_id: string
    available_stock: number
    reserved_stock: number
    updated_at: Date
}

export type ProductImageRow = {
    id: string
    product_id: string
    url: string
    position: number
    created_at: Date
}

export type CartRow = {
    buyer_id: string
    shipping_address_id: string
    status: string
    created_at: Date
    updated_at: Date
}

export type CartItemRow = {
    id: string
    cart_id: string
    product_id: string
    sell_unit_id: string
    quantity: number
    is_valid: boolean
}
export type ReservationRow = {
    id: string
    buyer_id: string
    product_id: string
    sell_unit_id: string
    quantity: number
    pickup_date: Date
    status: string
    created_at: Date
    updated_at: Date
}

export type SaleRow = {
    id: string
    buyer_id: string
    product_id: string
    sell_unit_id: string
    quantity: number
    total: number
    created_at: Date
    updated_at: Date
}
