import { EntityId } from '../../../lib/domain/EntityId.js'
import { TransactionManager } from '../../../domain/shared/interfaces/TransactionManager.js'
import { SellerRepositoryFactory } from '../../../domain/seller/repositories/SellerRepository.js'
import { ProductRepositoryFactory } from '../../../../../infra/db/repositories/ProductRepository.js'
import { ProductService } from '../../../domain/services/ProductService.js'

export type DeleteProductBySellerCmd = {
    sellerId: string
    productId: string
}

export class DeleteProductBySellerUsecase {
    constructor(
        private readonly tm: TransactionManager,
        private readonly prf: ProductRepositoryFactory,
        private readonly arf: SellerRepositoryFactory,
        private readonly ps: ProductService,
    ) {}

    async execute(input: DeleteProductBySellerCmd) {
        // check if seller exists
        return await this.tm.runInTransaction(async trx => {
            const ar = this.arf.create(trx)
            const pr = this.prf.create(trx)

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
