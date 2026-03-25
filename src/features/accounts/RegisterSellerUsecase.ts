import { IdGenerator } from '../../domain/shared/interfaces/IdGenerator.js'
import { PasswordUtil } from '../../domain/shared/interfaces/PasswordUtil.js'
import { TransactionManager } from '../../domain/shared/interfaces/TransactionManager.js'
import { Email } from '../../domain/shared/value_objects/Email.js'
import { RawPassword } from '../../domain/shared/value_objects/RawPassword.js'
import { MobilePhoneNumber } from '../../domain/shared/value_objects/MobilePhoneNumber.js'
import { Account } from '../../domain/account/aggregates/Account.js'
import { SellerUniquenessService } from '../../domain/shopping/seller/services/StoreUniquenessService.js'
import { Seller } from '../../domain/shopping/seller/aggregates/Seller.js'

export type RegisterSellerCmd = {
    email: string
    password: string

    store: {
        storeName: string
        storeSlug: string
        storeDescription: string | null
    }

    supportEmail: string | null
    supportPhone: string | null

    address: {
        region: string
        province: string | null
        city: string | null
        barangay: string
        addressLine1: string
        addressLine2: string | null
    }
}

// check uniqueness of seller
// make address
// save address
// save seller
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
            const addressRepo = uow.getAccountRepo()

            const uniquenessService = new SellerUniquenessService(sr)

            const email = Email.create(cmd.email).unwrapOrThrow('email')
            await uniquenessService.assertEmailIsUnique(email)
            const rawPassword = RawPassword.create(cmd.password).unwrapOrThrow(
                'password',
            )
            const hash = await this.passwordHasher.hash(rawPassword)
            const id = this.idGen.generate()
            const account = Account.new(id, email, hash)
            const addressId = 
            const seller = Seller.new(
                id,
                addressId,
                storeName,
                storeSlug,
                description,
                supportEmail,
                supportPhone,
            )
            //
            // await ar.save(account)
            // await sr.save(seller)
            // await uow.publishEvents()
        })
    }
}
