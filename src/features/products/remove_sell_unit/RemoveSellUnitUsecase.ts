import { OnlyOwningVerifiedActiveSellerMayManageProductPolicy } from '../../../domain/seller/services/OnlyOwningVerifiedActiveSellerMayManageProductPolicy.js'
import { TransactionManager } from '../../../domain/shared/interfaces/TransactionManager.js'
import {
    UnitOfMeasurement,
    UnitOfMeasurementValues,
} from '../../../domain/shared/value_objects/UnitOfMeasurement.js'
import { ProductNotFoundException } from '../../../exceptions/product/ProductNotFoundException.js'
import { SellerNotFoundByIdException } from '../../../exceptions/seller/SellerNotFoundByIdException.js'
import { EntityId } from '../../../lib/domain/EntityId.js'

export type RemoveSellUnitCmd = {
    productId: string
    sellerId: string
    sellUnitId: string
}

export class RemoveSellUnitUsecase {
    constructor(private readonly tm: TransactionManager) {}

    async execute(cmd: RemoveSellUnitCmd) {
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
            const sellUnitId = EntityId.create(cmd.sellUnitId)

            product.removeSellUnit(sellUnitId)

            await pr.save(product)
        })
    }
}
