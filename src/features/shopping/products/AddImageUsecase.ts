import { EntityId } from '../../../domain/shared/EntityId.js'
import { IdGenerator } from '../../../domain/shared/interfaces/IdGenerator.js'
import { TransactionManager } from '../../../domain/shared/interfaces/TransactionManager.js'
import { ImagePath } from '../../../domain/shared/value_objects/ImagePath.js'
import { ProductNotFoundException } from '../../../exceptions/product/ProductNotFoundException.js'
import { SellerNotFoundByIdException } from '../../../exceptions/seller/SellerNotFoundByIdException.js'
import { InternalServerError } from '../../../exceptions/shared/InternalServerError.js'

export type AddImagesCmd = {
    productId: string
    sellerId: string
    paths: string[]
}

export class AddImagesUsecase {
    constructor(
        private readonly tm: TransactionManager,
        private readonly idGen: IdGenerator,
    ) {}
    async execute(cmd: AddImagesCmd) {
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
            for (const path of cmd.paths) {
                const imagePathResult = ImagePath.create(path)
                if (imagePathResult.isError()) {
                    throw new InternalServerError('image path is invalid')
                }
                const imagePath = imagePathResult.getValue()
                product.addImage(this.idGen.generate(), imagePath)
            }
            await pr.save(product)
        })
    }
}
