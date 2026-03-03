import { Sale } from '../../domain/sale/aggregates/Sale.js'
import { SaleTotalCalculatorService } from '../../domain/sale/services/SaleTotalCalculatorService.js'
import { EntityId } from '../../domain/shared/EntityId.js'
import { IdGenerator } from '../../domain/shared/interfaces/IdGenerator.js'
import { TransactionManager } from '../../domain/shared/interfaces/TransactionManager.js'
import { BuyerNotFoundByIdException } from '../../exceptions/buyer/BuyerNotFoundByIdException.js'
import { ProductSellUnitNotFoundException } from '../../exceptions/product/ProductSellUnitNotFoundException.js'
import { ReservationNotFoundException } from '../../exceptions/reservation/ReservationNotFoundException.js'

export type ConfirmReservationCmd = {
    buyerId: string
    reservationId: string
}

export class ConfirmReservationUsecase {
    constructor(
        private readonly tm: TransactionManager,
        private readonly idGen: IdGenerator,
    ) {}

    async execute(cmd: ConfirmReservationCmd) {
        await this.tm.transaction(async uow => {
            const br = uow.getBuyerRepo()
            const rr = uow.getReservationRepo()
            const pr = uow.getProductRepo()
            const sr = uow.getSaleRepo()

            const buyerId = EntityId.create(cmd.buyerId)
            const buyer = await br.findById(buyerId)
            if (!buyer) {
                throw new BuyerNotFoundByIdException(buyerId.value)
            }
            buyer.assertIsUnbanned()
            buyer.assertIsVerified()

            const reservationId = EntityId.create(cmd.reservationId)
            const reservation = await rr.findById(reservationId)
            if (!reservation) {
                throw new ReservationNotFoundException(reservationId.value)
            }
            const pricePerUnit = await pr.getSellUnitPricePerUnit(
                reservation.sellUnitId,
                reservation.productId,
            )
            if (!pricePerUnit) {
                throw new ProductSellUnitNotFoundException(
                    reservation.sellUnitId.value,
                    reservation.productId.value,
                )
            }

            reservation.confirm()

            const saleTotal = SaleTotalCalculatorService.calculate(
                reservation.quantity,
                pricePerUnit,
            )

            const sale = Sale.new(
                this.idGen.generate(),
                reservation.buyerId,
                reservation.productId,
                reservation.sellUnitId,
                reservation.quantity,
                saleTotal,
            )

            await rr.save(reservation)
            await sr.save(sale)
            await uow.publishEvents()
        })
    }
}
