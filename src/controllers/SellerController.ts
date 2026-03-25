import {
    RegisterSellerCmd,
    RegisterSellerUsecase,
} from '../features/accounts/RegisterSellerUsecase.js'

export class SellerController {
    constructor(
        private readonly registerSellerUsecase: RegisterSellerUsecase,
    ) {}

    async register(cmd: RegisterSellerCmd) {
        await this.registerSellerUsecase.execute(cmd)
    }
}
