export type UserRow = {
    id: string
    email: string
    password_hash: string
    created_at: Date
    updated_at: Date
    banned_at: Date | null
}
