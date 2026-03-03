import { TransactionManager } from '../../../domain/shared/interfaces/TransactionManager.js'

export class ValidateCartUsecase {
    constructor(private readonly tm: TransactionManager) {}
}
