import {
    RegisterSellerUsecase,
    RegisterSellerCmd,
} from '../usecases/sellers/RegisterSellerUsecase.js'
import {
    VerifySellerCmd,
    VerifySellerUsecase,
} from '../usecases/sellers/VerifySellerUsecase.js'

export class SellerController {
    constructor(
        private readonly registerSeller: RegisterSellerUsecase,
        private readonly verifySeller: VerifySellerUsecase,
    ) {}

    async register(cmd: RegisterSellerCmd) {
        await this.registerSeller.execute(cmd)
    }

    async verify(cmd: VerifySellerCmd) {
        await this.verifySeller.execute(cmd)
    }
}
