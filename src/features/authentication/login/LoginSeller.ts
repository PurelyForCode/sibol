import { PasswordUtil } from '../../../domain/shared/interfaces/PasswordUtil.js'
import { TransactionManager } from '../../../domain/shared/interfaces/TransactionManager.js'
import { HashedPassword } from '../../../domain/shared/value_objects/HashedPassword.js'
import { RawPassword } from '../../../domain/shared/value_objects/RawPassword.js'
import { SellerNotFoundByEmailException } from '../../../exceptions/seller/SellerNotFoundByEmailException.js'
import { SellerNotFoundByIdException } from '../../../exceptions/seller/SellerNotFoundByIdException.js'
import { IncorrectPasswordException } from '../../../exceptions/shared/IncorrectPasswordException.js'
import { InternalServerError } from '../../../exceptions/shared/InternalServerError.js'
import { ValidationException } from '../../../exceptions/ValidationException.js'

export type LoginSellerCmd = {
    password: string
    email: string
}

export class LoginSellerUsecase {
    constructor(
        private readonly tm: TransactionManager,
        private readonly pu: PasswordUtil,
    ) {}

    async execute(cmd: LoginSellerCmd) {
        await this.tm.transaction(async uow => {
            const sellerRepo = uow.getSellerRepo()
            const accountRepo = uow.getAccountRepo()

            const seller = await sellerRepo.findByEmail(cmd.email)
            if (!seller) {
                throw new SellerNotFoundByEmailException(cmd.email)
            }

            const credentials = await accountRepo.getCredentials(seller.id)
            if (credentials === null) {
                throw new SellerNotFoundByIdException(seller.id.value)
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
