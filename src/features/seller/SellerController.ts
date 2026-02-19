import {
    LoginSellerCmd,
    LoginSellerUsecase,
} from '../authentication/login/LoginSeller.js'
import {
    RegisterSellerCmd,
    RegisterSellerUsecase,
} from './register_seller/RegisterSellerUsecase.js'

export class SellerController {
    constructor(
        private readonly registerSellerUsecase: RegisterSellerUsecase,
    ) {}

    async register(cmd: RegisterSellerCmd) {
        await this.registerSellerUsecase.execute(cmd)
    }
}
