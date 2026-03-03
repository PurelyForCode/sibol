import { LoginBuyerCmd, LoginBuyerUsecase } from './LoginBuyer.js'
import { LoginSellerCmd, LoginSellerUsecase } from './LoginSeller.js'

export class AuthenticationController {
    constructor(
        private readonly loginSellerUsecase: LoginSellerUsecase,
        private readonly loginBuyerUsecase: LoginBuyerUsecase,
        private readonly loginAdminUsecase: any,
    ) {}

    async loginSeller(cmd: LoginSellerCmd) {
        await this.loginSellerUsecase.execute(cmd)
    }

    async loginBuyer(cmd: LoginBuyerCmd) {
        await this.loginBuyerUsecase.execute(cmd)
    }
}
