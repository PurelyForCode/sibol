import { EntityId } from '../../../domain/shared/EntityId.js'
import { TransactionManager } from '../../../domain/shared/interfaces/TransactionManager.js'
import { ProductNotFoundException } from '../../../exceptions/product/ProductNotFoundException.js'
import { SellerNotFoundByIdException } from '../../../exceptions/seller/SellerNotFoundByIdException.js'

export type MakeThumbnailCmd = {
    sellerId: string
    productId: string
    imageId: string
}

export class MakeThumbnailUsecase {
    constructor(private readonly tm: TransactionManager) {}
    async execute(cmd: MakeThumbnailCmd) {
        await this.tm.transaction(async uow => {
            const pr = uow.getProductRepo()
            const sr = uow.getSellerRepo()

            const sellerId = EntityId.create(cmd.sellerId)
            const seller = await sr.findById(sellerId)
            if (!seller) {
                throw new SellerNotFoundByIdException(cmd.sellerId)
            }
            seller.assertIsUnbanned()
            seller.assertIsVerified()

            const productId = EntityId.create(cmd.productId)
            const product = await pr.findById(productId)
            if (!product) {
                throw new ProductNotFoundException(cmd.productId)
            }
            const imageId = EntityId.create(cmd.imageId)
            product.setImageAsThumbnail(imageId)
            await pr.save(product)
        })
    }
}
