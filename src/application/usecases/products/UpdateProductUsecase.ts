import { TransactionManager } from '../../../core/interfaces/TransactionManager.js'
import { DuplicateProductNameException } from '../../../exceptions/products/DuplicateProductNameException.js'
import { ProductNotFoundException } from '../../../exceptions/products/ProductNotFoundException.js'
import { SellerNotFoundException } from '../../../exceptions/seller/SellerNotFoundException.js'

export type UpdateProductCmd = {
    productId: string
    sellerId: string
    name?: string
    description?: string | null
}

export class UpdateProductUsecase {
    constructor(private readonly tm: TransactionManager) {}

    async execute(cmd: UpdateProductCmd) {
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

            if (cmd.name) {
                const duplicateName = await pr.productExistsByNameAndSellerId(
                    cmd.name,
                    cmd.sellerId,
                )
                if (duplicateName) {
                    throw new DuplicateProductNameException(cmd.name)
                }
            }

            if (cmd.name) {
                product.changeName(cmd.name)
            }
            if (cmd.description) {
                product.changeDescription(cmd.description)
            }

            await pr.insert(product)
        })
    }
}
