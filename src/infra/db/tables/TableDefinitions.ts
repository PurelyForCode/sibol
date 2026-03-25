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
export type VerificationCodeRow = {
    id: string
    account_id: string
    code: string
    type: string
    expires_at: Date
    used_at: Date | null
    created_at: Date
}

export type RegionRow = {
    id: string
    code: string
    name: string
}

export type ProvinceRow = {
    id: string
    code: string
    name: string
}

export type MunicipalityCityRow = {
    id: string
    code: string
    name: string
}

export type BarangayRow = {
    id: string
    code: string
    name: string
}

export type AddressRow = {
    id: string
    region_id: number
    province_id: number
    municipality_city_id: number | null
    barangay_id: number
    address_line1: string
    address_line2: string | null
    created_at: Date
    updated_at: Date
}

export type AdminRow = {
    id: string
    first_name: string
    middle_initial: string
    last_name: string
}

export type SellerRow = {
    id: string
    store_id: string | null
    first_name: string
    middle_initial: string
    last_name: string
    is_verified: boolean
    is_banned: boolean
    created_at: Date
    updated_at: Date
}

export type BuyerRow = {
    id: string
    address_id: string | null
    first_name: string
    middle_initial: string
    last_name: string
    username: string
    is_verified: boolean
    is_banned: boolean
    created_at: Date
    updated_at: Date
}

export type StoreRow = {
    id: string
    address_id: string
    name: string
    description: string | null
    support_email: string | null
    support_phone: string | null
    total_sales: number
}

export type DeliveryScheduleRow = {
    id: string
    store_id: string
    type: string
    rule: Object
}

export type CategoryRow = {
    id: string
    store_id: string
    name: string
}

export type ProductRow = {
    id: string
    category_id: string | null
    store_id: string
    name: string
    description: string | null
    available_stock: number
    reserved_stock: number
    base_unit: string
    rating: number | null
    review_count: number
    sale_count: number
    status: string
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
}

export type SellUnitRow = {
    id: string
    product_id: string
    conversion_factor: number
    price_per_unit: number
    display_name: string
    discontinued_at: Date | null
    is_default: boolean
}

export type ProductDeliveryScheduleRow = {
    id: string
    product_id: string
    schedule_id: string
}

export type InventoryMovementRow = {
    id: string
    product_id: string
    delta_quantity: number
    reason: string
    created_at: Date
}

export type ProductImageRow = {
    id: string
    product_id: string
    url: string
    position: number
    created_at: Date
    is_thumbnail: boolean
}

export type ProductComplaintRow = {
    id: string
    buyer_id: string
    product_id: string
    admin_id: string | null
    subject: string
    content: string
    approved_at: Date | null
    disapproved_at: Date | null
    created_at: Date
    updated_at: Date
}

export type ProductComplaintImageRow = {
    id: string
    complaint_id: string
    url: string
}

export type CartRow = {
    buyer_id: string
    status: string
}

export type CartItemRow = {
    id: string
    cart_id: string
    product_id: string
    sell_unit_id: string
    quantity: number
    is_valid: boolean
}

export type OrderRow = {
    id: string
    buyer_id: string
    store_id: string
    total_price: number
    status: string
    payment_method: string
    created_at: Date
    updated_at: Date
    cancelled_at: Date | null
}

export type OrderItemRow = {
    id: string
    order_id: string
    product_id: string
    sell_unit_id: string
    quantity: number
    unit_price_at_purchase: number
}

export type SaleRow = {
    id: string
    buyer_id: string | null
    product_id: string
    sell_unit_id: string
    quantity: number
    total: number
    is_reviewed: boolean
    created_at: Date
    updated_at: Date
}

export type SaleComplaintRow = {
    id: string
    buyer_id: string
    sale_id: string
    admin_id: string | null
    subject: string
    content: string
    approved_at: Date | null
    disapproved_at: Date | null
    created_at: Date
    updated_at: Date
}
export type SaleComplaintImageRow = {
    id: string
    complaint_id: string
    url: string
}

export type ReviewRow = {
    id: string
    buyer_id: string
    sale_id: string
    rating: number
    message: string | null
    created_at: Date
    updated_at: Date
}

export type ReviewImageRow = {
    id: string
    review_id: string
    url: string
    position: number
}

export type SellerModerationRow = {
    id: string
    seller_id: string
    admin_id: string | null
    action_type: string
    reason: string
    created_at: Date
}

export type BuyerModerationRow = {
    id: string
    buyer_id: string
    admin_id: string | null
    action_type: string
    reason: string
    created_at: Date
}

export type ProductModerationRow = {
    id: string
    product_id: string
    admin_id: string | null
    product_complaint_id: string | null
    action_type: string
    reason: string
    created_at: Date
}

export type SaleModerationRow = {
    id: string
    sale_id: string
    admin_id: string | null
    sale_complaint_id: string | null
    action_type: string
    reason: string
    created_at: Date
}
