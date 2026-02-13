import { Id, IdGenerator } from '../core/interfaces/IdGenerator.js'
import { TransactionManager } from '../core/interfaces/TransactionManager.js'
import { SellerAlreadyExistsException } from '../exceptions/seller/SellerAlreadyExistsException.js'
import { Seller } from '../model/seller/Seller.js'

export type RegisterSellerCmd = {
    email: string
    password: string
    storeName: string
    storeSlug: string
    description: string | null
    supportEmail: string | null
    supportPhone: string | null
}

export class SellerService {
    constructor(
        private readonly tm: TransactionManager,
        private readonly idGen: IdGenerator<Id>,
    ) {}

    async register(cmd: RegisterSellerCmd) {
        await this.tm.transaction(async uow => {
            const sr = uow.getSellerRepo()
            const exists = await sr.findByEmail(cmd.email)
            if (exists) {
                throw new SellerAlreadyExistsException(cmd.email)
            }
            const id = this.idGen.generate()

            Seller.new(
                id,
                cmd.storeName,
                cmd.storeSlug,
                cmd.description,
                cmd.supportEmail,
                cmd.supportPhone,
            )
        })
    }
}
