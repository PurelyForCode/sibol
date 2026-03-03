import { TransactionManager } from '../../../domain/shared/interfaces/TransactionManager.js'
import { BuyerNotFoundByIdException } from '../../../exceptions/buyer/BuyerNotFoundByIdException.js'
import { ProductSellUnitNotFoundException } from '../../../exceptions/product/ProductSellUnitNotFoundException.js'
import { SellerDoesNotOwnProductException } from '../../../exceptions/product/SellerDoesNotOwnProductException.js'
import { InternalServerError } from '../../../exceptions/shared/InternalServerError.js'
import { EntityId } from '../../../domain/shared/EntityId.js'

export type RemoveFromCartCmd = {
    cartItemId: string
    buyerId: string
}

export class RemoveFromCartUsecase {
    constructor(private readonly tm: TransactionManager) {}

    async execute(cmd: RemoveFromCartCmd) {
        await this.tm.transaction(async uow => {
            const cr = uow.getCartRepo()
            const br = uow.getBuyerRepo()

            const buyerId = EntityId.create(cmd.buyerId)
            const buyer = await br.findById(buyerId)
            if (!buyer) {
                throw new BuyerNotFoundByIdException(cmd.buyerId)
            }
            buyer.assertIsUnbanned()
            buyer.assertIsVerified()

            const cart = await cr.findById(buyer.id)
            if (!cart) {
                throw new InternalServerError(
                    'Cart is not initialized for a buyer',
                )
            }
            const itemId = EntityId.create(cmd.cartItemId)
            cart.removeItem(itemId)

            await cr.save(cart)
            await uow.publishEvents()
        })
    }
}
