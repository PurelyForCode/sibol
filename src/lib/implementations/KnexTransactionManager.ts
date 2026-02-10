import { Knex } from 'knex'
import {
    TransactionManager,
    TransactionConfig,
} from '../interfaces/TransactionManager.js'

export class KnexTransactionManager implements TransactionManager {
    constructor(private readonly knex: Knex) {}

    runInTransaction<T>(
        work: (trx: Knex.Transaction) => Promise<T>,
        config?: TransactionConfig,
    ): Promise<T> {
        let trxConfig: Knex.TransactionConfig = {}
        // if (config) {
        //     if (config.isolationLevel) {
        //         switch (config.isolationLevel) {
        //             case IsolationLevel.READ_COMMITTED:
        //                 trxConfig.isolationLevel = 'read committed'
        //                 break
        //             case IsolationLevel.READ_UNCOMMITTED:
        //                 trxConfig.isolationLevel = 'read uncommitted'
        //                 break
        //             case IsolationLevel.REPEATABLE_READ:
        //                 trxConfig.isolationLevel = 'repeatable read'
        //                 break
        //             case IsolationLevel.SERIALIZABLE:
        //                 trxConfig.isolationLevel = 'serializable'
        //                 break
        //             default:
        //                 throw new Error()
        //         }
        //     }
        // }

        return this.knex.transaction(async trx => {
            return work(trx)
        }, trxConfig)
    }
}
