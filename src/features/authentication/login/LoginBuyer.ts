import { PasswordUtil } from '../../../domain/shared/interfaces/PasswordUtil.js'
import { TransactionManager } from '../../../domain/shared/interfaces/TransactionManager.js'
import { HashedPassword } from '../../../domain/shared/value_objects/HashedPassword.js'
import { RawPassword } from '../../../domain/shared/value_objects/RawPassword.js'
import { BuyerNotFoundByEmailException } from '../../../exceptions/buyer/BuyerNotFoundByEmailException.js'
import { BuyerNotFoundByIdException } from '../../../exceptions/buyer/BuyerNotFoundByIdException.js'
import { IncorrectPasswordException } from '../../../exceptions/shared/IncorrectPasswordException.js'
import { InternalServerError } from '../../../exceptions/shared/InternalServerError.js'
import { ValidationException } from '../../../exceptions/ValidationException.js'

export type LoginBuyerCmd = {
    password: string
    email: string
}

export class LoginBuyerUsecase {
    constructor(
        private readonly tm: TransactionManager,
        private readonly pu: PasswordUtil,
    ) {}

    async execute(cmd: LoginBuyerCmd) {
        await this.tm.transaction(async uow => {
            const buyerRepo = uow.getBuyerRepo()
            const accountRepo = uow.getAccountRepo()
            const buyer = await buyerRepo.findByEmail(cmd.email)
            if (!buyer) {
                throw new BuyerNotFoundByEmailException(cmd.email)
            }

            const credentials = await accountRepo.getCredentials(buyer.id)
            if (credentials === null) {
                throw new BuyerNotFoundByIdException(buyer.id.value)
            }
            const raw = RawPassword.create(cmd.password)
            if (raw.isError()) {
                throw new ValidationException('password', raw.message!)
            }
            const hash = HashedPassword.create(credentials.password)
            if (hash.isError()) {
                throw new InternalServerError(
                    'Hashed password from database is invalid',
                )
            }

            const passwordMatches = await this.pu.verify(
                raw.getValue(),
                hash.getValue(),
            )

            if (!passwordMatches) {
                throw new IncorrectPasswordException()
            }
            // make a jwt
        })
    }
}
