import { Account } from '../../../domain/account/aggregates/Account.js'
import { Buyer } from '../../../domain/buyer/aggregates/Buyer.js'
import { IdGenerator } from '../../../domain/shared/interfaces/IdGenerator.js'
import { PasswordUtil } from '../../../domain/shared/interfaces/PasswordUtil.js'
import { TransactionManager } from '../../../domain/shared/interfaces/TransactionManager.js'
import { Email } from '../../../domain/shared/value_objects/Email.js'
import { RawPassword } from '../../../domain/shared/value_objects/RawPassword.js'
import { Username } from '../../../domain/shared/value_objects/Username.js'
import { BuyerEmailAlreadyTakenException } from '../../../exceptions/buyer/BuyerEmailAlreadyTakenException.js'
import { BuyerUsernameAlreadyExistsException } from '../../../exceptions/buyer/BuyerUsernameAlreadyExistsException.js'

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
    ) {}

    async execute(cmd: RegisterBuyerCmd) {
        await this.tm.transaction(async uow => {
            const br = uow.getBuyerRepo()
            const ar = uow.getAccountRepo()

            const email = Email.create(cmd.email).unwrapOrThrow('email')
            const duplicateEmail = await br.existsByEmail(email)
            if (duplicateEmail) {
                throw new BuyerEmailAlreadyTakenException(cmd.email)
            }

            const username = Username.create(cmd.username).unwrapOrThrow(
                'username',
            )

            const duplicateUsername = await br.existsByUsername(username)
            if (duplicateUsername) {
                throw new BuyerUsernameAlreadyExistsException(cmd.email)
            }

            const id = this.idGen.generate()
            const raw = RawPassword.create(cmd.password).unwrapOrThrow(
                'password',
            )
            const hashedPassword = await this.passwordHasher.hash(raw)

            const buyer = Buyer.new(id, username)
            const account = Account.new(id, email, hashedPassword)

            await ar.save(account)
            await br.save(buyer)
            await uow.publishEvents()
        })
    }
}
