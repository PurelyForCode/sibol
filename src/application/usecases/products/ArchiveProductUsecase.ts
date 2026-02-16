import { TransactionManager } from '../../../core/interfaces/TransactionManager.js'
import { ProductNotFoundException } from '../../../exceptions/products/ProductNotFoundException.js'
import { SellerNotFoundException } from '../../../exceptions/seller/SellerNotFoundException.js'

export type ArchiveProductCmd = {
    sellerId: string
    productId: string
}
export class ArchiveProductUsecase {
    constructor(private readonly tm: TransactionManager) {}
    async execute(cmd: ArchiveProductCmd) {
        await this.tm.transaction(async uow => {
            const sr = uow.getSellerRepo()
            const pr = uow.getProductRepo()

            const sellerExists = await sr.findById(cmd.sellerId)
            if (!sellerExists) {
                throw new SellerNotFoundException(cmd.sellerId)
            }

            const product = await pr.findById(cmd.productId)
            if (!product) {
                throw new ProductNotFoundException(cmd.productId)
            }
            product.archive()
            await pr.update(product)
        })
    }
}
