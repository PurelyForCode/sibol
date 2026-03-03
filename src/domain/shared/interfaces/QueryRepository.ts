export interface QueryRepository<T, ID> {
    findById(id: ID): Promise<T | null>

    findAll(params?: {
        filter?: unknown
        pagination?: {
            page?: number
            limit?: number
        }
    }): Promise<readonly T[]>
}
