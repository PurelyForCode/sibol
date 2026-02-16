import { Id, IdGenerator } from '../../../core/interfaces/IdGenerator.js'
import { PasswordHasher } from '../../../core/interfaces/PasswordHasher.js'
import { TransactionManager } from '../../../core/interfaces/TransactionManager.js'
import { Buyer } from '../../../domain/model/buyer/Buyer.js'
import { User } from '../../../domain/model/user/User.js'
import {
    VerificationToken,
    VerificationTokenType,
} from '../../../domain/model/user/VerificationToken.js'
import { VerificationService } from '../../../domain/services/VerificationService.js'
import { BuyerAlreadyExistsException } from '../../../exceptions/buyer/BuyerAlreadyExistsException.js'
import { BuyerUsernameAlreadyExistsException } from '../../../exceptions/buyer/BuyerUsernameAlreadyExistsException.js'

export type RegisterBuyerCmd = {
    username: string
    email: string
    password: string
}
export class RegisterBuyerUsecase {
    constructor(
        private readonly tm: TransactionManager,
        private readonly idGen: IdGenerator<Id>,
        private readonly passwordHasher: PasswordHasher,
        private readonly verificationService: VerificationService,
    ) {}

    async execute(cmd: RegisterBuyerCmd) {
        await this.tm.transaction(async uow => {
            const br = uow.getBuyerRepo()
            const ur = uow.getUserRepo()

            const duplicateEmail = await ur.buyerExistsByEmail(cmd.email)
            if (duplicateEmail) {
                throw new BuyerAlreadyExistsException(cmd.email)
            }

            const duplicateUsername = await br.findByUsername(cmd.email)
            if (duplicateUsername) {
                throw new BuyerUsernameAlreadyExistsException(cmd.email)
            }

            const id = this.idGen.generate()
            const hashedPassword = await this.passwordHasher.hash(cmd.password)

            const buyer = Buyer.new(id, cmd.username)
            const user = User.new(id, cmd.email, hashedPassword)

            await ur.insert(user)
            await br.insert(buyer)

            const token = VerificationToken.generate(
                this.idGen.generate(),
                buyer.id,
                VerificationTokenType.BUYER_VERIFY,
            )

            await this.verificationService.sendVerificationToken(
                cmd.email,
                token,
            )
        })
    }
}
