type Transaction = unknown

export enum IsolationLevel {
    READ_UNCOMMITTED,
    READ_COMMITTED,
    REPEATABLE_READ,
    SERIALIZABLE,
}

export type TransactionConfig = {
    isolationLevel?: IsolationLevel
}

export interface TransactionManager {
    runInTransaction<T>(
        work: (trx: Transaction) => Promise<T>,
        config?: TransactionConfig,
    ): Promise<T>
}
