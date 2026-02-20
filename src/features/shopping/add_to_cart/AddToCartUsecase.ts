import { BuyerMustBeUnbannedToPerformActionPolicy } from '../../../domain/buyer/policies/BuyerMustBeUnbannedToPerformActionPolicy.js'
import { BuyerMustBeVerifiedToPerformActionPolicy } from '../../../domain/buyer/policies/BuyerMustBeVerifiedToPerformActionPolicy.js'
import { OnlyProductsFromActiveSellersMayBeAddedToCartPolicy } from '../../../domain/cart/policies/OnlyProductsFromActiveSellersMayBeAddedToCartPolicy.js'
import { TransactionManager } from '../../../domain/shared/interfaces/TransactionManager.js'
import { BuyerIsBannedException } from '../../../exceptions/buyer/BuyerIsBannedException.js'
import { BuyerIsUnverifiedException } from '../../../exceptions/buyer/BuyerIsUnverifiedException.js'
import { BuyerNotFoundByIdException } from '../../../exceptions/buyer/BuyerNotFoundByIdException.js'
import { ProductNotFoundException } from '../../../exceptions/product/ProductNotFoundException.js'
import { SellerDoesNotOwnProductException } from '../../../exceptions/product/SellerDoesNotOwnProductException.js'
import { InternalServerError } from '../../../exceptions/shared/InternalServerError.js'
import { EntityId } from '../../../lib/domain/EntityId.js'

export type AddToCartCmd = {
    productId: string
    buyerId: string
    quantity: number
    sellUnitId: string
}

export class AddToCartUsecase {
    constructor(private readonly tm: TransactionManager) {}

    async execute(cmd: AddToCartCmd) {
        await this.tm.transaction(async uow => {
            const pr = uow.getProductRepo()
            const cr = uow.getCartRepo()

            const br = uow.getBuyerRepo()
            const sr = uow.getSellerRepo()

            const productId = EntityId.create(cmd.productId)
            const product = await pr.findById(productId)

            if (!product) {
                throw new ProductNotFoundException(cmd.productId)
            }

            const seller = await sr.findById(product.sellerId)
            if (!seller) {
                throw new InternalServerError(
                    'Product was found but seller is not in the database',
                )
            }

            if (!product.sellerId.equals(seller.id)) {
                throw new SellerDoesNotOwnProductException(
                    seller.id.value,
                    product.id.value,
                )
            }

            OnlyProductsFromActiveSellersMayBeAddedToCartPolicy.enforce(
                product,
                seller,
            )

            const buyerId = EntityId.create(cmd.buyerId)
            const buyer = await br.findById(buyerId)

            if (!buyer) {
                throw new BuyerNotFoundByIdException(cmd.buyerId)
            }

            if (!BuyerMustBeUnbannedToPerformActionPolicy.enforce(buyer)) {
                throw new BuyerIsBannedException(buyer.id.value)
            }
            if (!BuyerMustBeVerifiedToPerformActionPolicy.enforce(buyer)) {
                throw new BuyerIsUnverifiedException(buyer.id.value)
            }
            //TODO:Finish this next week

            const cart = cr.findByBuyerId(buyerId)
        })
    }
}
