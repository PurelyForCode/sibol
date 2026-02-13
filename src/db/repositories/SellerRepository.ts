import { Knex } from 'knex'
import { Id } from '../../core/interfaces/IdGenerator.js'
import { Seller } from '../../model/seller/Seller.js'
import { SellerRepository } from '../../repositories/SellerRepository.js'

export class PgSellerRepository implements SellerRepository {
    constructor(private readonly knex: Knex.Transaction) {}

    findByEmail(email: string): Promise<Seller> {
        throw new Error('Method not implemented.')
    }
    insert(model: Seller): Promise<void> {
        throw new Error('Method not implemented.')
    }
    update(model: Seller): Promise<void> {
        throw new Error('Method not implemented.')
    }
    delete(modelId: Id): Promise<void> {
        throw new Error('Method not implemented.')
    }
    findById(id: Id): Promise<Seller | null> {
        throw new Error('Method not implemented.')
    }
    existsById(id: Id): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
}
