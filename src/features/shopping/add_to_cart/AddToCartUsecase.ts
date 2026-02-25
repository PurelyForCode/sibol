import { IdGenerator } from '../../../domain/shared/interfaces/IdGenerator.js'
import { TransactionManager } from '../../../domain/shared/interfaces/TransactionManager.js'
import { Quantity } from '../../../domain/shared/value_objects/Quantity.js'
import { BuyerNotFoundByIdException } from '../../../exceptions/buyer/BuyerNotFoundByIdException.js'
import { CanNotAddToCartBecauseSellerIsBannedException } from '../../../exceptions/cart/CanNotAddToCartBecauseSellerIsBannedException.js'
import { CanNotAddToCartBecauseSellerIsUnverifiedException } from '../../../exceptions/cart/CanNotAddToCartBecauseSellerIsUnverifiedException.js'
import { ProductNotFoundException } from '../../../exceptions/product/ProductNotFoundException.js'
import { ProductSellUnitNotFoundException } from '../../../exceptions/product/ProductSellUnitNotFoundException.js'
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
    constructor(
        private readonly tm: TransactionManager,
        private readonly idGen: IdGenerator,
    ) {}

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
                    'Product exists in database but seller is null',
                )
            }
            try {
                seller.assertIsUnbanned()
            } catch (e) {
                throw new CanNotAddToCartBecauseSellerIsBannedException(
                    cmd.productId,
                    seller.id.value,
                )
            }

            try {
                seller.assertIsVerified()
            } catch (e) {
                throw new CanNotAddToCartBecauseSellerIsUnverifiedException(
                    cmd.productId,
                    seller.id.value,
                )
            }

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

            const id = this.idGen.generate()
            const sellUnitId = EntityId.create(cmd.sellUnitId)
            const sellUnit = product.getSellUnitById(sellUnitId)
            if (!sellUnit) {
                throw new ProductSellUnitNotFoundException(
                    sellUnitId.value,
                    product.id.value,
                )
            }
            const quantity = Quantity.create(cmd.quantity).unwrapOrThrow(
                'quantity',
            )
            cart.addItem(id, sellUnit, quantity)
            await cr.save(cart)
            await uow.publishEvents()
        })
    }
}
