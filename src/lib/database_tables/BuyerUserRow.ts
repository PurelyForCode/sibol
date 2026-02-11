export type BuyerUserRow = {
    id: string
    email: string
    username: string
    is_verified: boolean
    total_orders: number

    banned_at: Date | null
    updated_at: Date
    created_at: Date
}
