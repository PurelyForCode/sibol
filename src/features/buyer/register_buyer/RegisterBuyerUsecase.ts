import { Account } from '../../../domain/account/aggregates/Account.js'
import { Buyer } from '../../../domain/buyer/aggregates/Buyer.js'
import { IdGenerator } from '../../../domain/shared/interfaces/IdGenerator.js'
import { PasswordUtil } from '../../../domain/shared/interfaces/PasswordUtil.js'
import { TransactionManager } from '../../../domain/shared/interfaces/TransactionManager.js'
import { VerificationService } from '../../../domain/shared/services/VerificationService.js'
import { RawPassword } from '../../../domain/shared/value_objects/RawPassword.js'
import { BuyerEmailAlreadyTakenException } from '../../../exceptions/buyer/BuyerEmailAlreadyTakenException.js'
import { BuyerUsernameAlreadyExistsException } from '../../../exceptions/buyer/BuyerUsernameAlreadyExistsException.js'
import { ValidationException } from '../../../exceptions/ValidationException.js'

export type RegisterBuyerCmd = {
    username: string
    email: string
    password: string
}

export class RegisterBuyerUsecase {
    constructor(
        private readonly tm: TransactionManager,
        private readonly idGen: IdGenerator,
        private readonly passwordHasher: PasswordUtil,
        private readonly verificationService: VerificationService,
    ) {}

    async execute(cmd: RegisterBuyerCmd) {
        await this.tm.transaction(async uow => {
            const br = uow.getBuyerRepo()
            const ur = uow.getAccountRepo()

            const duplicateEmail = await br.existsByEmail(cmd.email)
            if (duplicateEmail) {
                throw new BuyerEmailAlreadyTakenException(cmd.email)
            }

            const duplicateUsername = await br.existsByUsername(cmd.email)
            if (duplicateUsername) {
                throw new BuyerUsernameAlreadyExistsException(cmd.email)
            }

            const id = this.idGen.generate()
            const raw = RawPassword.create(cmd.password)
            if (raw.isError()) {
                throw new ValidationException('password', raw.message!)
            }
            const hashedPassword = await this.passwordHasher.hash(
                raw.getValue(),
            )

            const buyer = Buyer.new(id, cmd.username)
            const account = Account.new(id, cmd.email, hashedPassword)

            await ur.insert(user)
            await br.insert(buyer)
        })
    }
}
