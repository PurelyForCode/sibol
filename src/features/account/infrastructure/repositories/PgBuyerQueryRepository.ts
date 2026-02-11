import { Knex } from 'knex'
import { EntityId } from '../../../../lib/EntityId.js'
import { Repository } from '../../../../lib/interfaces/Repository.js'
import { Buyer } from '../../domain/entities/Buyer.js'
import {
    BuyerRepository,
    BuyerRepositoryFactory,
} from '../../domain/repositories/BuyerRepository.js'

export class PgBuyerRepositoryFactory implements BuyerRepositoryFactory {
    create(props: any): Repository<any, any> {
        throw new Error('Method not implemented.')
    }
}
export class PgBuyerRepository implements BuyerRepository {
    constructor(private readonly k: Knex.Transaction) {}
    findById(id: EntityId): Promise<Buyer | null> {
        throw new Error('Method not implemented.')
    }
    existsById(id: EntityId): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
    save(T: Buyer): Promise<void> {
        throw new Error('Method not implemented.')
    }
    delete(id: EntityId): Promise<void> {
        throw new Error('Method not implemented.')
    }
}
