import { Router, Request, Response, NextFunction } from 'express'
import z from 'zod'
import { validateInput } from '../../../lib/middleware/InputValidationMiddleware.js'
import { EntityId } from '../../../lib/domain/EntityId.js'
import {
    sellerController,
    sellerQueryRepository,
} from '../../../compositionRoot.js'

export const sellerRouter = Router({
    mergeParams: true,
})

sellerRouter.get(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
        } catch (e: unknown) {
            next(e)
        }
    },
)

const getSellerBySellerIdSchema = z.object({
    params: z.object({ sellerId: z.uuidv7() }),
})

sellerRouter.get(
    '/:sellerId',
    validateInput(getSellerBySellerIdSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validated = req.validated as z.infer<
                typeof getSellerBySellerIdSchema
            >
            const sellerId = EntityId.create(validated.params.sellerId)
            const seller = await sellerQueryRepository.findById(sellerId)
            if (!seller) {
                res.status(404).json({ message: 'Seller could not be found' })
                return
            }

            res.status(200).json({ data: seller })
        } catch (e: unknown) {
            next(e)
        }
    },
)

const createSellerRequestSchema = z.object({
    body: z.object({
        email: z.string().email(),
        password: z.string().min(8),
        storeName: z.string().min(3),
    }),
})

sellerRouter.post(
    '/register',
    validateInput(createSellerRequestSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validated = req.validated as z.infer<
                typeof createSellerRequestSchema
            >
            await sellerController.register({
                email: validated.body.email,
                password: validated.body.password,
                storeName: validated.body.storeName,
            })

            res.status(201).json({
                message: 'Successfully registered seller account',
            })
        } catch (e: unknown) {
            next(e)
        }
    },
)
