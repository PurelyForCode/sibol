import { OnlyOwningVerifiedActiveSellerMayManageProductPolicy } from '../../../domain/seller/policies/OnlyOwningVerifiedActiveSellerMayManageProductPolicy.js'
import { IdGenerator } from '../../../domain/shared/interfaces/IdGenerator.js'
import { TransactionManager } from '../../../domain/shared/interfaces/TransactionManager.js'
import { UnitOfMeasurement } from '../../../domain/shared/value_objects/UnitOfMeasurement.js'
import { ProductNotFoundException } from '../../../exceptions/product/ProductNotFoundException.js'
import { SellerNotFoundByIdException } from '../../../exceptions/seller/SellerNotFoundByIdException.js'
import { EntityId } from '../../../lib/domain/EntityId.js'

export type AddSellUnitCmd = {
    sellerId: string
    productId: string
    unit: string
}

export class AddSellUnitUsecase {
    constructor(
        private readonly tm: TransactionManager,
        private readonly idGen: IdGenerator,
    ) {}

    async execute(cmd: AddSellUnitCmd) {
        await this.tm.transaction(async uow => {
            const pr = uow.getProductRepo()
            const sr = uow.getSellerRepo()

            const sellerId = EntityId.create(cmd.sellerId)
            const seller = await sr.findById(sellerId)
            if (!seller) {
                throw new SellerNotFoundByIdException(cmd.sellerId)
            }

            const productId = EntityId.create(cmd.productId)
            const product = await pr.findById(productId)
            if (!product) {
                throw new ProductNotFoundException(cmd.productId)
            }

            OnlyOwningVerifiedActiveSellerMayManageProductPolicy.enforce(
                seller,
                product,
            )

            const id = this.idGen.generate()
            const unit = UnitOfMeasurement.create(cmd.unit).unwrapOrThrow(
                'unitOfMeasurement',
            )
            product.addSellUnit(id, unit)
            await pr.save(product)
        })
    }
}
