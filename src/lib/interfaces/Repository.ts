export interface Repository<T, ID> {
    findById(id: ID): Promise<T | null>
    existsById(id: ID): Promise<boolean>
    create(T: T): Promise<void>
    delete(id: ID): Promise<void>
    update(T: T): Promise<void>
}
