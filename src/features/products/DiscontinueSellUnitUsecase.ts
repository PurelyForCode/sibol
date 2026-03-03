import { ProductOwnershipService } from '../../domain/product/services/ProductOwnershipService.js'
import { TransactionManager } from '../../domain/shared/interfaces/TransactionManager.js'
import { ProductNotFoundException } from '../../exceptions/product/ProductNotFoundException.js'
import { SellerNotFoundByIdException } from '../../exceptions/seller/SellerNotFoundByIdException.js'
import { EntityId } from '../../domain/shared/EntityId.js'

export type DiscontinueSellUnitCmd = {
    productId: string
    sellerId: string
    sellUnitId: string
}

export class DiscontinueSellUnitUsecase {
    constructor(private readonly tm: TransactionManager) {}

    async execute(cmd: DiscontinueSellUnitCmd) {
        await this.tm.transaction(async uow => {
            const pr = uow.getProductRepo()
            const sr = uow.getSellerRepo()

            const sellerId = EntityId.create(cmd.sellerId)
            const seller = await sr.findById(sellerId)
            if (!seller) {
                throw new SellerNotFoundByIdException(cmd.sellerId)
            }
            seller.assertIsVerified()
            seller.assertIsUnbanned()

            const productId = EntityId.create(cmd.productId)
            const product = await pr.findById(productId)
            if (!product) {
                throw new ProductNotFoundException(cmd.productId)
            }

            ProductOwnershipService.assertSellerOwnsProduct(seller, product)
            const sellUnitId = EntityId.create(cmd.sellUnitId)

            product.discontinueSellUnit(sellUnitId)
            await pr.save(product)
        })
    }
}
