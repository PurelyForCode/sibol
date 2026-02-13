import { Knex } from 'knex'
import { Id } from '../../core/interfaces/IdGenerator.js'
import { Product } from '../../model/product/Product.js'
import { ProductRepository } from '../../repositories/ProductRepository.js'

export class PgProductRepository implements ProductRepository {
    constructor(private readonly knex: Knex.Transaction) {}
    insert(model: Product): Promise<void> {
        throw new Error('Method not implemented.')
    }
    update(model: Product): Promise<void> {
        throw new Error('Method not implemented.')
    }
    delete(modelId: Id): Promise<void> {
        throw new Error('Method not implemented.')
    }
    findById(id: Id): Promise<Product | null> {
        throw new Error('Method not implemented.')
    }
    existsById(id: Id): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
}
