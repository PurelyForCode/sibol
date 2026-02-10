import { IdGenerator } from '../../../lib/interfaces/IdGenerator.js'
import { PasswordHasher } from '../../../lib/interfaces/PasswordHasher.js'
import { TransactionManager } from '../../../lib/interfaces/TransactionManager.js'
import { Email } from '../domain/entities/Email.js'
import { RawPassword } from '../domain/entities/RawPassword.js'
import { StoreName } from '../domain/entities/seller/StoreName.js'
import { TotalSales } from '../domain/entities/seller/TotalSales.js'
import { SellerRepositoryFactory } from '../domain/repositories/SellerRepository.js'
import { SellerService } from '../domain/services/SellerService.js'

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
        private readonly passwordHasher: PasswordHasher,
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
