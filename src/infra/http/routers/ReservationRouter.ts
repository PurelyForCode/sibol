import { Router } from 'express'
import { reservationQueryRepository } from '../../../compositionRoot.js'
import { EntityId } from '../../../domain/shared/EntityId.js'
import { fakeBuyerId } from '../../../fakeData/fakeId.js'

export const reservationRouter = Router({ mergeParams: true })
reservationRouter.get('/', async (_req, res, next) => {
    try {
        const buyerId = EntityId.create(fakeBuyerId)
        const data =
            await reservationQueryRepository.findAllReservationsByBuyerId(
                buyerId,
            )
        res.json(data)
    } catch (e) {
        next(e)
    }
})
