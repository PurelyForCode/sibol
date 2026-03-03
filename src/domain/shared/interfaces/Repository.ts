export interface Repository<T, ID> {
    findById(id: ID): Promise<T | null>
    existsById(id: ID): Promise<boolean>
    save(entity: T): Promise<void>
    delete(id: ID): Promise<void>
}
