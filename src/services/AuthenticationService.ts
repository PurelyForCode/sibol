import { TransactionManager } from '../core/interfaces/TransactionManager.js'
import { UserRepository } from '../repositories/UserRepository.js'

export type LoginAccountCommand = {
    email: string
    role: string
    password: string
}

export class AuthenticationService {
    constructor(private readonly tm: TransactionManager) {}
    async authenticate(cmd: LoginAccountCommand) {}
}
