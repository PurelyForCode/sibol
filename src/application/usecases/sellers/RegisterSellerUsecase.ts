import { EmailService } from '../../../core/interfaces/EmailService.js'
import { Id, IdGenerator } from '../../../core/interfaces/IdGenerator.js'
import { PasswordHasher } from '../../../core/interfaces/PasswordHasher.js'
import { TransactionManager } from '../../../core/interfaces/TransactionManager.js'
import { Seller } from '../../../domain/model/seller/Seller.js'
import { User } from '../../../domain/model/user/User.js'
import {
    VerificationToken,
    VerificationTokenType,
} from '../../../domain/model/user/VerificationToken.js'
import { VerificationService } from '../../../domain/services/VerificationService.js'
import { SellerAlreadyExistsException } from '../../../exceptions/seller/SellerAlreadyExistsException.js'
import { StoreNameAlreadyExistsException } from '../../../exceptions/seller/StoreNameAlreadyExistsException.js'

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
        private readonly idGen: IdGenerator<Id>,
        private readonly passwordHasher: PasswordHasher,
        private readonly verificationService: VerificationService,
    ) {}

    async execute(cmd: RegisterSellerCmd) {
        await this.tm.transaction(async uow => {
            const sr = uow.getSellerRepo()
            const ur = uow.getUserRepo()
            const exists = await ur.sellerExistsByEmail(cmd.email)
            if (exists) {
                throw new SellerAlreadyExistsException(cmd.email)
            }
            const duplicateName = await sr.findByStoreName(cmd.storeName)
            if (duplicateName) {
                throw new StoreNameAlreadyExistsException(cmd.storeName)
            }
            const duplicateSlug = await sr.findByStoreSlug(cmd.storeSlug)
            if (duplicateSlug) {
                throw new StoreNameAlreadyExistsException(cmd.storeName)
            }

            const hashedPassword = await this.passwordHasher.hash(cmd.password)
            const id = this.idGen.generate()

            const user = User.new(id, cmd.email, hashedPassword)
            const seller = Seller.new(
                id,
                cmd.storeName,
                cmd.storeSlug,
                cmd.description,
                cmd.supportEmail,
                cmd.supportPhone,
            )

            await ur.insert(user)
            await sr.insert(seller)

            const token = VerificationToken.generate(
                this.idGen.generate(),
                seller.id,
                VerificationTokenType.SELLER_VERIFY,
            )

            await this.verificationService.sendVerificationToken(
                cmd.email,
                token,
            )
        })
    }
}
