import { Id, IdGenerator } from '../../../core/interfaces/IdGenerator.js'
import { TransactionManager } from '../../../core/interfaces/TransactionManager.js'
import { UnitOfMeasurement } from '../../../domain/model/product/UnitOfMeasurement.js'
import { ProductPricing } from '../../../domain/model/product_pricing/ProductPricing.js'
import { ProductNotFoundException } from '../../../exceptions/products/ProductNotFoundException.js'
import { SellerDoesNotOwnProductException } from '../../../exceptions/products/SellerDoesNotOwnProductException.js'
import { SellerNotFoundException } from '../../../exceptions/seller/SellerNotFoundException.js'

export type AddPricingCmd = {
    productId: string
    sellerId: string
    sellUnit: UnitOfMeasurement
    conversionFactor: number
    pricingPerUnit: number
}

export class AddPricingUsecase {
    constructor(
        private readonly tm: TransactionManager,
        private readonly idGenerator: IdGenerator<Id>,
    ) {}
    async execute(cmd: AddPricingCmd) {
        await this.tm.transaction(async uow => {
            const pr = uow.getProductRepo()
            const sr = uow.getSellerRepo()
            const seller = await sr.findById(cmd.sellerId)
            if (!seller) {
                throw new SellerNotFoundException(cmd.sellerId)
            }

            const product = await pr.findById(cmd.productId)

            if (!product) {
                throw new ProductNotFoundException(cmd.sellerId)
            }

            if (product.sellerId !== seller.id) {
                throw new SellerDoesNotOwnProductException(
                    cmd.sellerId,
                    cmd.productId,
                )
            }

            const id = this.idGenerator.generate()
            ProductPricing.new(
                id,
                cmd.productId,
                cmd.sellUnit,
                cmd.conversionFactor,
                cmd.pricingPerUnit,
            )
        })
    }
}
