import { EntityId } from '../../../domain/shared/EntityId.js'
import { TransactionManager } from '../../../domain/shared/interfaces/TransactionManager.js'
import { SellerNotFoundByIdException } from '../../../exceptions/seller/SellerNotFoundByIdException.js'
import { ProductNotFoundException } from '../../../exceptions/product/ProductNotFoundException.js'
import { ProductOwnershipService } from '../../../domain/product/services/ProductOwnershipService.js'

export type ArchiveProductBySellerCmd = {
    sellerId: string
    productId: string
}

export class ArchiveProductBySellerUsecase {
    constructor(private readonly tm: TransactionManager) {}

    async execute(cmd: ArchiveProductBySellerCmd) {
        // check if seller exists
        return await this.tm.transaction(async uow => {
            const sr = uow.getSellerRepo()
            const pr = uow.getProductRepo()

            const sellerId = EntityId.create(cmd.sellerId)
            const seller = await sr.findById(sellerId)
            if (!seller) {
                throw new SellerNotFoundByIdException(cmd.sellerId)
            }
            // check if product exists
            const productId = EntityId.create(cmd.productId)
            const product = await pr.findById(productId)
            if (!product) {
                throw new ProductNotFoundException(cmd.productId)
            }

            seller.assertIsUnbanned()
            seller.assertIsVerified()
            ProductOwnershipService.assertSellerOwnsProduct(seller, product)

            // TODO:handle some side effects of deleting the product
            product.archive()

            await pr.save(product)
            await uow.publishEvents()
        })
    }
}
