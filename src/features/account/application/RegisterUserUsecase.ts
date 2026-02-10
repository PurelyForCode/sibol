import { TransactionManager } from '../../../lib/interfaces/TransactionManager.js'
import { UserRepositoryFactory } from '../domain/repositories/UserRepository.js'

export type RegisterUserCmd = {
    username: string
    email: string
    password: string
    role: string
}

export class RegisterUserUsecase {
    constructor(
        private readonly tm: TransactionManager,
        private readonly urf: UserRepositoryFactory,
    ) {}
    execute() {}
}
