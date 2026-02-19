import {
    RegisterBuyerCmd,
    RegisterBuyerUsecase,
} from './register_buyer/RegisterBuyerUsecase.js'

export class BuyerController {
    constructor(private readonly registerBuyerUsecase: RegisterBuyerUsecase) {}

    async register(cmd: RegisterBuyerCmd) {
        await this.registerBuyerUsecase.execute(cmd)
    }
    login() {}
}
