import { EntityId } from '../../domain/shared/EntityId.js'
import { ImageStorage } from '../../domain/shared/interfaces/ImageStorage.js'
import { TransactionManager } from '../../domain/shared/interfaces/TransactionManager.js'
import { ProductNotFoundException } from '../../exceptions/product/ProductNotFoundException.js'
import { SellerNotFoundByIdException } from '../../exceptions/seller/SellerNotFoundByIdException.js'

export type RemoveImageCmd = {
    productId: string
    imageId: string
    sellerId: string
}
export class RemoveImageUsecase {
    constructor(
        private readonly tm: TransactionManager,
        private readonly imageStorage: ImageStorage,
    ) {}

    async execute(cmd: RemoveImageCmd) {
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
            const imagePath = product.removeImage(imageId)
            await pr.save(product)
            await this.imageStorage.delete(imagePath)
        })
    }
}
