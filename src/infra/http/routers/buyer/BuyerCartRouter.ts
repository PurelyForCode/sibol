import { Request, Response, NextFunction, Router } from 'express'
import z from 'zod'
import { fakeBuyerId } from '../../../../fakeData/fakeId.js'
import { EntityId } from '../../../../domain/shared/EntityId.js'
import {
    cartController,
    cartQueryRepository,
} from '../../../../compositionRoot.js'
import { validateInput } from '../../middleware/InputValidationMiddleware.js'

export const buyerCartRouter = Router({ mergeParams: true })

buyerCartRouter.get('/', async (req, res, next) => {
    try {
        const buyerId = EntityId.create(fakeBuyerId)
        const data = await cartQueryRepository.findByBuyerId(buyerId)
        res.json(data)
    } catch (e) {
        next(e)
    }
})

const addToCartRequestSchema = z.object({
    body: z.object({
        quantity: z.number(),
        productId: z.uuidv7(),
        sellUnitId: z.uuidv7(),
    }),
})

buyerCartRouter.post(
    '/items',
    validateInput(addToCartRequestSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const buyerId = fakeBuyerId
            const { body } = req.validated as z.infer<
                typeof addToCartRequestSchema
            >
            await cartController.addToCart({
                buyerId,
                productId: body.productId,
                quantity: body.quantity,
                sellUnitId: body.sellUnitId,
            })
            res.status(201).json({ message: 'Successfully added item to cart' })
        } catch (e) {
            next(e)
        }
    },
)

const removeFromCartSchema = z.object({
    params: z.object({
        itemId: z.uuidv7(),
    }),
})

buyerCartRouter.delete(
    '/items/:itemId',
    validateInput(removeFromCartSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const buyerId = fakeBuyerId
            const { params } = req.validated as z.infer<
                typeof removeFromCartSchema
            >
            await cartController.removeFromCart({
                buyerId: buyerId,
                cartItemId: params.itemId,
            })
            res.status(204).end()
        } catch (e) {
            next(e)
        }
    },
)

const reserveItemsForPickupRequestSchema = z.object({
    body: z.object({
        pickupDate: z.iso.datetime(),
        items: z.array(z.uuidv7()),
    }),
})

buyerCartRouter.post(
    '/items/reserve',
    validateInput(reserveItemsForPickupRequestSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const buyerId = fakeBuyerId
            const { body } = req.validated as z.infer<
                typeof reserveItemsForPickupRequestSchema
            >
            const pickupDate = new Date(body.pickupDate)
            await cartController.reserveItemsForPickup({
                buyerId,
                items: body.items,
                pickupDate: pickupDate,
            })
            res.status(201).json({ message: 'Successfully reserved items' })
        } catch (e) {
            next(e)
        }
    },
)
