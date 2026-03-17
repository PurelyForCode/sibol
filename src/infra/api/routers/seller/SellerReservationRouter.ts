import { Router } from 'express'
import {
    reservationController,
    reservationQueryRepository,
} from '../../../../compositionRoot.js'
import { EntityId } from '../../../../domain/shared/EntityId.js'
import { fakeBuyerId, fakeSellerId } from '../../../../fakeData/fakeId.js'
import z from 'zod'
import { validateInput } from '../../middleware/InputValidationMiddleware.js'

export const sellerReservationRouter = Router({ mergeParams: true })

sellerReservationRouter.get('/', async (_req, res, next) => {
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

const fulfillReservationRequestSchema = z.object({
    params: z.object({
        reservationId: z.uuidv7(),
    }),
})

sellerReservationRouter.post(
    '/:reservationId/fulfill',
    validateInput(fulfillReservationRequestSchema),
    async (req, res, next) => {
        try {
            const { params } = req.validated as z.infer<
                typeof fulfillReservationRequestSchema
            >
            await reservationController.fulfillReservation({
                evidence: null,
                reservationId: params.reservationId,
                sellerId: fakeSellerId,
            })
            res.status(200).json({
                message: 'Marked reservation as fulfilled',
            })
        } catch (e) {
            next(e)
        }
    },
)
