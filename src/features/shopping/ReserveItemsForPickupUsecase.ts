import { CartValidityChecker } from '../../domain/cart/services/CartItemValidityChecker.js'
import { Reservation } from '../../domain/reservation/aggregates/Reservation.js'
import { IdGenerator } from '../../domain/shared/interfaces/IdGenerator.js'
import { TransactionManager } from '../../domain/shared/interfaces/TransactionManager.js'
import { BuyerNotFoundByIdException } from '../../exceptions/buyer/BuyerNotFoundByIdException.js'
import { ProductsHaveInsufficientStockException } from '../../exceptions/product/ProductsHaveInsufficientStockException.js'
import { InternalServerError } from '../../exceptions/shared/InternalServerError.js'
import { EntityId } from '../../domain/shared/EntityId.js'

export type ReserveItemsForPickupCmd = {
    items: string[]
    buyerId: string
    pickupDate: Date
}

export class ReserveItemsForPickupUsecase {
    constructor(
        private readonly tm: TransactionManager,
        private readonly idGen: IdGenerator,
    ) {}
    async execute(cmd: ReserveItemsForPickupCmd) {
        await this.tm.transaction(async uow => {
            const br = uow.getBuyerRepo()
            const cr = uow.getCartRepo()
            const pr = uow.getProductRepo()
            const rr = uow.getReservationRepo()

            const buyerId = EntityId.create(cmd.buyerId)
            const buyer = await br.findById(buyerId)
            if (!buyer) {
                throw new BuyerNotFoundByIdException(cmd.buyerId)
            }
            buyer.assertIsUnbanned()
            buyer.assertIsVerified()

            const cart = await cr.findById(buyer.id)
            if (!cart) {
                throw new InternalServerError('Buyer exists without cart table')
            }

            const cartItems = cart.getItems(
                cmd.items.map(x => EntityId.create(x)),
            )
            const cartChecker = new CartValidityChecker(pr)
            const itemIds = cmd.items.map(x => EntityId.create(x))
            const productsWithInsufficientStock =
                await cartChecker.getProductsWithInsufficientStock(
                    cart,
                    itemIds,
                )

            if (productsWithInsufficientStock.length > 0) {
                throw new ProductsHaveInsufficientStockException(
                    productsWithInsufficientStock.map(x => x.value),
                )
            }
            const reservations: Reservation[] = []
            for (const item of cartItems) {
                const product = await pr.findById(item.productId)
                if (!product) {
                    throw new InternalServerError(
                        'Product inside cart does not exist',
                    )
                }
                const sellUnit = product.getSellUnitById(item.sellUnitId)
                if (!sellUnit) {
                    throw new InternalServerError(
                        "Cart item's sell unit does not exist in product",
                    )
                }
                const stockToReserve = sellUnit.convertQuantityToProductStock(
                    item.quantity,
                )
                product.reserve(stockToReserve)

                const id = this.idGen.generate()
                const reservation = Reservation.new(
                    id,
                    buyer.id,
                    product.id,
                    sellUnit.id,
                    item.quantity,
                    cmd.pickupDate,
                )
                reservations.push(reservation)
                await pr.save(product)
            }

            for (const item of cartItems) {
                cart.removeItem(item.id)
            }
            await cr.save(cart)
            for (const reservation of reservations) {
                await rr.save(reservation)
            }
            await uow.publishEvents()
        })
    }
}
