import { EntityId } from '../../domain/shared/EntityId.js'
import { TransactionManager } from '../../domain/shared/interfaces/TransactionManager.js'
import { ProductNotFoundException } from '../../exceptions/product/ProductNotFoundException.js'
import { ReservationNotFoundException } from '../../exceptions/reservation/ReservationNotFoundException.js'
import { SellerNotFoundByIdException } from '../../exceptions/seller/SellerNotFoundByIdException.js'
import { InternalServerError } from '../../exceptions/shared/InternalServerError.js'

export type FulfillReservationCmd = {
    sellerId: string
    reservationId: string
    evidence: null
}
export class FulfillReservationUsecase {
    constructor(private readonly tm: TransactionManager) {}

    async execute(cmd: FulfillReservationCmd) {
        await this.tm.transaction(async uow => {
            const sr = uow.getSellerRepo()
            const pr = uow.getProductRepo()
            const rr = uow.getReservationRepo()

            const sellerId = EntityId.create(cmd.sellerId)
            const seller = await sr.findById(sellerId)
            if (!seller) {
                throw new SellerNotFoundByIdException(sellerId.value)
            }
            seller.assertIsUnbanned()
            seller.assertIsVerified()

            const reservationId = EntityId.create(cmd.reservationId)
            const reservation = await rr.findById(reservationId)
            if (!reservation) {
                throw new ReservationNotFoundException(reservationId.value)
            }

            const product = await pr.findById(reservation.productId)
            if (!product) {
                throw new ProductNotFoundException(reservation.productId.value)
            }
            const sellUnit = product.getSellUnitById(reservation.sellUnitId)
            if (!sellUnit) {
                throw new InternalServerError('Sell unit is deleted')
            }
            const toBeSoldStock = sellUnit.convertQuantityToProductStock(
                reservation.quantity,
            )
            product.sellReservedStock(toBeSoldStock)
            reservation.fulfill()
            await pr.save(product)
            await rr.save(reservation)
            await uow.publishEvents()
        })
    }
}
