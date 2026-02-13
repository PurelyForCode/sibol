import { Knex } from 'knex'
import { Id } from '../../core/interfaces/IdGenerator.js'
import { Buyer } from '../../model/buyer/Buyer.js'
import { BuyerRepository } from '../../repositories/BuyerRepository.js'

export class PgBuyerRepository implements BuyerRepository {
    constructor(private readonly knex: Knex.Transaction) {}

    insert(model: Buyer): Promise<void> {
        throw new Error('Method not implemented.')
    }
    update(model: Buyer): Promise<void> {
        throw new Error('Method not implemented.')
    }
    delete(modelId: Id): Promise<void> {
        throw new Error('Method not implemented.')
    }
    findById(id: Id): Promise<Buyer | null> {
        throw new Error('Method not implemented.')
    }
    existsById(id: Id): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
}
