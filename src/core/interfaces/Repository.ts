import { Id } from './IdGenerator.js'

export interface Repository<T> {
    insert(model: T): Promise<void>
    update(model: T): Promise<void>
    delete(modelId: Id): Promise<void>
    findById(id: Id): Promise<T | null>
    existsById(id: Id): Promise<boolean>
}
