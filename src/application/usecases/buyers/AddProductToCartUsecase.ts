import { TransactionManager } from '../../../core/interfaces/TransactionManager.js'

export type AddProductToCartCmd = {
    buyerId: string
    productId: string
    pricingId: string
    quantity: number
}

export class AddProductToCartUsecase {
    constructor(private readonly tm: TransactionManager) {}
    async execute() {}
}
