import { TransactionManager } from '../interfaces/TransactionManager.js'

// This needs to be a singleton?
// This needs to be able to get the currect
class PgRepositoryFactory {
    constructor(private readonly tm: TransactionManager) {}
    createProductRepo() {}
}
