import { EntityId } from '../../../lib/domain/EntityId.js'
import { TransactionManager } from '../../../domain/shared/interfaces/TransactionManager.js'

export type DeleteProductBySellerCmd = {
    sellerId: string
    productId: string
}

export class DeleteProductBySellerUsecase {
    constructor(private readonly tm: TransactionManager) {}

    async execute(input: DeleteProductBySellerCmd) {
        // check if seller exists
        return await this.tm.transaction(async uow => {
            const ar = uow.getAccountRepo()
            const pr = uow.getProductRepo()

            const sellerId = EntityId.create(input.sellerId)
            const seller = await ar.findById(sellerId)
            if (seller === null) {
                throw new Error('Seller account does not exist')
            }
            // check if product exists
            const productId = EntityId.create(input.productId)
            const product = await pr.findById(productId)
            if (product === null) {
                throw new Error('Product not found')
            }
            // check if seller owns the product
            if (!product.sellerId.equals(sellerId)) {
                throw new Error('Can not delete product not owned by seller')
            }
            // TODO:handle some side effects of deleting the product

            product.archive()
            await pr.save(product)
        })
    }
}
