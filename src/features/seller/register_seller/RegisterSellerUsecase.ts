import { IdGenerator } from '../../../domain/shared/interfaces/IdGenerator.js'
import { PasswordUtil } from '../../../domain/shared/interfaces/PasswordUtil.js'
import { TransactionManager } from '../../../domain/shared/interfaces/TransactionManager.js'
import { Email } from '../../../domain/shared/value_objects/Email.js'
import { RawPassword } from '../../../domain/shared/value_objects/RawPassword.js'
import { StoreName } from '../../../domain/seller/value_objects/StoreName.js'
import { TotalSales } from '../../../domain/seller/value_objects/TotalSales.js'
import { SellerRepositoryFactory } from '../../../domain/seller/repositories/SellerRepository.js'
import { SellerService } from '../../../domain/seller/services/SellerService.js'

export type RegisterSellerCmd = {
    email: string
    password: string
    storeName: string
}

export class RegisterSellerUsecase {
    constructor(
        private readonly tm: TransactionManager,
        private readonly srf: SellerRepositoryFactory,
        private readonly ss: SellerService,
        private readonly idGen: IdGenerator,
        private readonly passwordHasher: PasswordUtil,
    ) {}
    async execute(cmd: RegisterSellerCmd) {
        await this.tm.runInTransaction(async trx => {
            const sr = this.srf.create(trx)

            const email = Email.create(cmd.email)

            if (!email.isSuccess) {
                throw new Error()
            }
            if (await sr.existsByEmail(email.value)) {
                throw new Error()
            }

            const rawPassword = RawPassword.create(cmd.password)

            if (!rawPassword.isSuccess) {
                throw new Error(rawPassword.error)
            }

            const hash = await this.passwordHasher.hash(rawPassword.value)

            const id = this.idGen.generate()

            const storeName = StoreName.create(cmd.storeName)
            if (!storeName.isSuccess) {
                throw new Error()
            }

            // Validation not needed
            const totalSales = TotalSales.create(0)

            const seller = this.ss.create({
                email: email.value,
                id: id,
                // new seller, no rating
                rating: null,
                storeName: storeName.value,
                totalSales: totalSales.value,
            })

            await sr.register({ passwordHash: hash, seller: seller })
        })
    }
}
