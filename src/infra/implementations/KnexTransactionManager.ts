import { Knex } from 'knex'
import { TransactionManager } from '../../domain/shared/interfaces/TransactionManager.js'
import { UnitOfWork } from '../../domain/shared/interfaces/UnitOfWork.js'
import { IdGenerator } from '../../domain/shared/interfaces/IdGenerator.js'
import { KnexUnitOfWork } from './KnexUnitOfWork.js'

export class KnexTransactionManager implements TransactionManager {
    constructor(
        private readonly knex: Knex,
        private readonly idGenerator: IdGenerator,
    ) {}

    async transaction<T>(fn: (uow: UnitOfWork) => Promise<T>): Promise<T> {
        return await this.knex.transaction(async trx => {
            const uow = new KnexUnitOfWork(trx, this.idGenerator)
            return await fn(uow)
        })
    }
}
