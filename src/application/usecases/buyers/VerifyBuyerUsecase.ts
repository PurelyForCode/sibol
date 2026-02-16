import { TransactionManager } from '../../../core/interfaces/TransactionManager.js'
import { VerificationService } from '../../../domain/services/VerificationService.js'
import { BuyerNotFoundException } from '../../../exceptions/buyer/BuyerNotFoundException.js'

export type VerifyBuyerCmd = {
    id: string
}

export class VerifyBuyerUsecase {
    constructor(
        private readonly tm: TransactionManager,
        private readonly verificationService: VerificationService,
    ) {}

    async execute(cmd: VerifyBuyerCmd) {
        await this.tm.transaction(async uow => {
            const br = uow.getBuyerRepo()
            const buyer = await br.findById(cmd.id)
            if (!buyer) {
                throw new BuyerNotFoundException(cmd.id)
            }
            buyer.verify()
            await br.update(buyer)
        })
    }
}
