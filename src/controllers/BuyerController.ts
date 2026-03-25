import {
    RegisterBuyerCmd,
    RegisterBuyerUsecase,
} from '../features/accounts/RegisterBuyerUsecase.js'

export class BuyerController {
    constructor(private readonly registerBuyerUsecase: RegisterBuyerUsecase) {}

    async register(cmd: RegisterBuyerCmd) {
        await this.registerBuyerUsecase.execute(cmd)
    }
    login() {}
}
