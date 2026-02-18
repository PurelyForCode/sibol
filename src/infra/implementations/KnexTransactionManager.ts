import { Knex } from 'knex'
import { TransactionManager } from '../../domain/shared/interfaces/TransactionManager.js'
import { UnitOfWork } from '../../domain/shared/interfaces/UnitOfWork.js'

export class KnexTransactionManager implements TransactionManager {
    constructor(private readonly knex: Knex) {}

    async transaction<T>(fn: (uow: UnitOfWork) => Promise<T>): Promise<T> {
        return await this.knex.transaction(async trx => {
            const uow = new KnexUnitOfWork(trx)
            return await fn(uow)
        })
    }
}
