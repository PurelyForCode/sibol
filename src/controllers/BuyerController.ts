import { RegisterSellerCmd, SellerService } from '../services/SellerService.js'

export class BuyerController {
    constructor(private readonly sellerService: SellerService) {}

    async register(cmd: RegisterSellerCmd) {
        await this.sellerService.register(cmd)
    }
}
