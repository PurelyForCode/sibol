import { TransactionManager } from '../../../core/interfaces/TransactionManager.js'
import { VerificationService } from '../../../domain/services/VerificationService.js'
import { SellerNotFoundException } from '../../../exceptions/seller/SellerNotFoundException.js'

export type VerifySellerCmd = {
    id: string
}

export class VerifySellerUsecase {
    constructor(
        private readonly tm: TransactionManager,
        private readonly verificationService: VerificationService,
    ) {}

    async execute(cmd: VerifySellerCmd) {
        await this.tm.transaction(async uow => {
            const sr = uow.getSellerRepo()
            const seller = await sr.findById(cmd.id)
            if (!seller) {
                throw new SellerNotFoundException(cmd.id)
            }
            seller.verify()
            await sr.update(seller)
        })
    }
}
