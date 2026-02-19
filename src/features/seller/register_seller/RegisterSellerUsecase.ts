import { IdGenerator } from '../../../domain/shared/interfaces/IdGenerator.js'
import { PasswordUtil } from '../../../domain/shared/interfaces/PasswordUtil.js'
import { TransactionManager } from '../../../domain/shared/interfaces/TransactionManager.js'
import { Email } from '../../../domain/shared/value_objects/Email.js'
import { RawPassword } from '../../../domain/shared/value_objects/RawPassword.js'
import { StoreName } from '../../../domain/seller/value_objects/StoreName.js'
import { SellerEmailAlreadyExistsException } from '../../../exceptions/seller/SellerEmailAlreadyExistsException.js'
import { Seller } from '../../../domain/seller/aggregates/Seller.js'
import { StoreSlug } from '../../../domain/seller/value_objects/StoreSlug.js'
import { SellerDescription } from '../../../domain/seller/value_objects/SellerDescription.js'
import { MobilePhoneNumber } from '../../../domain/shared/value_objects/MobilePhoneNumber.js'
import { Account } from '../../../domain/account/aggregates/Account.js'
import { StoreNameAlreadyExistsException } from '../../../exceptions/seller/StoreNameAlreadyExistsException.js'
import { StoreSlugAlreadyExistsException } from '../../../exceptions/seller/StoreSlugAlreadyExistsException.js'

export type RegisterSellerCmd = {
    email: string
    password: string
    storeName: string
    storeSlug: string
    description: string | null
    supportEmail: string | null
    supportPhone: string | null
}

export class RegisterSellerUsecase {
    constructor(
        private readonly tm: TransactionManager,
        private readonly idGen: IdGenerator,
        private readonly passwordHasher: PasswordUtil,
    ) {}
    async execute(cmd: RegisterSellerCmd) {
        await this.tm.transaction(async uow => {
            const sr = uow.getSellerRepo()
            const ar = uow.getAccountRepo()
            const email = Email.create(cmd.email).unwrapOrThrow('email')
            if (await sr.existsByEmail(email)) {
                throw new SellerEmailAlreadyExistsException(cmd.email)
            }
            const storeName = StoreName.create(cmd.storeName).unwrapOrThrow(
                'storeName',
            )
            if (await sr.existsByStoreName(storeName)) {
                throw new StoreNameAlreadyExistsException(cmd.storeName)
            }
            const storeSlug = StoreSlug.create(cmd.storeSlug).unwrapOrThrow(
                'storeName',
            )
            if (await sr.existsByStoreSlug(storeSlug)) {
                throw new StoreSlugAlreadyExistsException(cmd.storeSlug)
            }
            const rawPassword = RawPassword.create(cmd.password).unwrapOrThrow(
                'password',
            )
            const hash = await this.passwordHasher.hash(rawPassword)
            const description = cmd.description
                ? SellerDescription.create(cmd.description).unwrapOrThrow(
                      'description',
                  )
                : null
            const supportEmail = cmd.supportEmail
                ? Email.create(cmd.supportEmail).unwrapOrThrow('supportEmail')
                : null
            const supportPhone = cmd.supportPhone
                ? MobilePhoneNumber.create(cmd.supportPhone).unwrapOrThrow(
                      'supportPhone',
                  )
                : null
            const id = this.idGen.generate()

            const account = Account.new(id, email, hash)
            const seller = Seller.new(
                id,
                storeName,
                storeSlug,
                description,
                supportEmail,
                supportPhone,
            )

            await ar.save(account)
            await sr.save(seller)
            await uow.publishEvents()
        })
    }
}
