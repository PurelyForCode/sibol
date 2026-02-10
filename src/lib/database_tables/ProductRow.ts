export type ProductRow = {
    id: string
    seller_id: string
    name: string
    description: string | null
    stock: number
    unit_of_measure: string
    unit_value: number
    price_per_unit: number
    rating: number | null
    created_at: Date
    updated_at: Date
    deleted_at: Date | null
}
