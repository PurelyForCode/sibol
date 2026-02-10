import {
    RegisterSellerCmd,
    RegisterSellerUsecase,
} from '../application/RegisterSellerUsecase.js'

export class SellerController {
    constructor(
        private readonly registerSellerUsecase: RegisterSellerUsecase,
    ) {}

    login() {}

    async register(cmd: RegisterSellerCmd) {
        await this.registerSellerUsecase.execute(cmd)
    }
}
