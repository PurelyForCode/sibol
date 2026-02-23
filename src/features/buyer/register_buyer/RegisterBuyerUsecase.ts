import { Account } from '../../../domain/account/aggregates/Account.js'
import { Buyer } from '../../../domain/buyer/aggregates/Buyer.js'
import { BuyerUniquenessService } from '../../../domain/buyer/services/BuyerUniquenessService.js'
import { Cart } from '../../../domain/cart/aggregates/Cart.js'
import { IdGenerator } from '../../../domain/shared/interfaces/IdGenerator.js'
import { PasswordUtil } from '../../../domain/shared/interfaces/PasswordUtil.js'
import { TransactionManager } from '../../../domain/shared/interfaces/TransactionManager.js'
import { Email } from '../../../domain/shared/value_objects/Email.js'
import { RawPassword } from '../../../domain/shared/value_objects/RawPassword.js'
import { Username } from '../../../domain/shared/value_objects/Username.js'
import { BuyerEmailAlreadyTakenException } from '../../../exceptions/buyer/BuyerEmailAlreadyTakenException.js'
import { BuyerUsernameAlreadyExistsException } from '../../../exceptions/buyer/BuyerUsernameAlreadyExistsException.js'
import { fakeBuyerAddressId } from '../../../fakeData/fakeId.js'
import { EntityId } from '../../../lib/domain/EntityId.js'

export type RegisterBuyerCmd = {
    username: string
    email: string
    password: string
    addressId: string
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
            const cr = uow.getCartRepo()
            const uniquenessChecker = new BuyerUniquenessService(br)

            const email = Email.create(cmd.email).unwrapOrThrow('email')
            await uniquenessChecker.assertIsEmailUniqueWithinBuyers(email)

            const username = Username.create(cmd.username).unwrapOrThrow(
                'username',
            )
            await uniquenessChecker.assertIsUsernameUnique(email)

            const id = this.idGen.generate()
            const raw = RawPassword.create(cmd.password).unwrapOrThrow(
                'password',
            )
            const hashedPassword = await this.passwordHasher.hash(raw)

            const addressId = EntityId.create(cmd.addressId)

            const buyer = Buyer.new(id, addressId, username)
            const account = Account.new(id, email, hashedPassword)
            const shippingAddressId = EntityId.create(cmd.addressId)

            const cart = Cart.new(buyer.id, shippingAddressId)
            await ar.save(account)
            await br.save(buyer)
            await cr.save(cart)

            await uow.publishEvents()
        })
    }
}
