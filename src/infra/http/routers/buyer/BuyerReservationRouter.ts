import { Router } from 'express'
import { EntityId } from '../../../../domain/shared/EntityId.js'
import { fakeBuyerId } from '../../../../fakeData/fakeId.js'
import {
    reservationController,
    reservationQueryRepository,
} from '../../../../compositionRoot.js'
import z from 'zod'
import { validateInput } from '../../middleware/InputValidationMiddleware.js'

export const buyerReservationRouter = Router({ mergeParams: true })

buyerReservationRouter.get('/', async (_req, res, next) => {
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

const confirmReservationRequestSchema = z.object({
    params: z.object({
        reservationId: z.uuidv7(),
    }),
})

buyerReservationRouter.post(
    '/:reservationId/confirm',
    validateInput(confirmReservationRequestSchema),
    async (req, res, next) => {
        try {
            const { params } = req.validated as z.infer<
                typeof confirmReservationRequestSchema
            >
            await reservationController.confirmReservation({
                reservationId: params.reservationId,
                buyerId: fakeBuyerId,
            })
            res.status(200).json({
                message: 'Marked reservation as confirmed',
            })
        } catch (e) {
            next(e)
        }
    },
)
