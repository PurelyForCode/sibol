import { Id, IdGenerator } from '../../../core/interfaces/IdGenerator.js'
import { TransactionManager } from '../../../core/interfaces/TransactionManager.js'
import { Product } from '../../../domain/model/product/Product.js'
import { UnitOfMeasurement } from '../../../domain/model/product/UnitOfMeasurement.js'
import { DuplicateProductNameException } from '../../../exceptions/products/DuplicateProductNameException.js'
import { SellerNotFoundException } from '../../../exceptions/seller/SellerNotFoundException.js'

export type CreateProductCmd = {
    sellerId: string
    name: string
    description: string | null
    baseUnit: UnitOfMeasurement
}
export class CreateProductUsecase {
    constructor(
        private readonly tm: TransactionManager,
        private readonly idGen: IdGenerator<Id>,
    ) {}
    async execute(cmd: CreateProductCmd) {
        await this.tm.transaction(async uow => {
            const sr = uow.getSellerRepo()
            const pr = uow.getProductRepo()

            const sellerExists = await sr.findById(cmd.sellerId)
            if (!sellerExists) {
                throw new SellerNotFoundException(cmd.sellerId)
            }

            const duplicateName = await pr.productExistsByNameAndSellerId(
                cmd.name,
                cmd.sellerId,
            )
            if (duplicateName) {
                throw new DuplicateProductNameException(cmd.name)
            }

            const id = this.idGen.generate()

            const product = Product.new(
                id,
                cmd.sellerId,
                cmd.name,
                cmd.description,
                cmd.baseUnit,
            )

            await pr.insert(product)
        })
    }
}
