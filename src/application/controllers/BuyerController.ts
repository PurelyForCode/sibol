import {
    RegisterBuyerCmd,
    RegisterBuyerUsecase,
} from '../usecases/buyers/RegisterBuyerUsecase.js'
import {
    VerifyBuyerCmd,
    VerifyBuyerUsecase,
} from '../usecases/buyers/VerifyBuyerUsecase.js'

export class BuyerController {
    constructor(
        private readonly registerBuyer: RegisterBuyerUsecase,
        private readonly verifyBuyer: VerifyBuyerUsecase,
    ) {}

    async register(cmd: RegisterBuyerCmd) {
        await this.registerBuyer.execute(cmd)
    }

    async verify(cmd: VerifyBuyerCmd) {
        await this.verifyBuyer.execute(cmd)
    }
}
