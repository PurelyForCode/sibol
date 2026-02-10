import { EntityId } from '../../../../../lib/EntityId.js'
import { TransactionManager } from '../../../../../lib/interfaces/TransactionManager.js'
import { UserRepositoryFactory } from '../../../../account/domain/repositories/UserRepository.js'
import { ProductRepositoryFactory } from '../../../domain/repositories/ProductRepository.js'
import { ProductService } from '../../../domain/services/ProductService.js'

export type DeleteProductBySellerCmd = {
    sellerId: string
    productId: string
}

export class DeleteProductBySellerUsecase {
    constructor(
        private readonly tm: TransactionManager,
        private readonly prf: ProductRepositoryFactory,
        private readonly arf: UserRepositoryFactory,
        private readonly ps: ProductService,
    ) {}

    async execute(input: DeleteProductBySellerCmd) {
        // check if seller exists
        return await this.tm.runInTransaction(async trx => {
            const ar = this.arf.create(trx)
            const pr = this.prf.create(trx)
            const sellerId = new EntityId(input.sellerId)
            const seller = await ar.findById(sellerId)
            if (seller === null) {
                throw new Error('Seller account does not exist')
            }
            // check if product exists
            const productId = new EntityId(input.productId)
            const product = await pr.findById(productId)
            if (product === null) {
                throw new Error('Product not found')
            }
            // check if seller owns the product
            if (!product.sellerId.equals(sellerId)) {
                throw new Error('Can not delete product not owned by seller')
            }
            // TODO:handle some side effects of deleting the product

            const deletedProduct = this.ps.deleteProductBySeller({
                product: product,
            })

            await pr.save(deletedProduct)
        })
    }
}
