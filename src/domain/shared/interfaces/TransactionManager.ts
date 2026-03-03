import { UnitOfWork } from './UnitOfWork.js'

export interface TransactionManager {
    transaction<T>(fn: (uow: UnitOfWork) => Promise<T>): Promise<T>
}
