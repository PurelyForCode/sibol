import { Router } from 'express'
import z from 'zod'
import { inputValidation } from '../middleware/inputValidationMiddleware.js'
import { buyerController } from '../../../compositionRoot.js'

export const buyerRouter = Router({ mergeParams: true })

const registerBuyerSchema = z.object({
    body: z.object({
        email: z.email(),
        password: z.string().min(8),
        username: z.string().min(3),
    }),
})

buyerRouter.post(
    '/register',
    inputValidation(registerBuyerSchema),
    async (req, res, next) => {
        try {
            const validated = req.validated as z.infer<
                typeof registerBuyerSchema
            >
            const body = validated.body
            await buyerController.register({
                email: body.email,
                password: body.password,
                username: body.username,
            })
            res.status(201).json({
                message: 'Successfully registered buyer',
            })
        } catch (e) {
            next(e)
        }
    },
)

const verifyBuyerSchema = z.object({
    params: z.object({
        buyerId: z.uuidv7(),
    }),
})

buyerRouter.post(
    '/:buyerId/verify/',
    inputValidation(verifyBuyerSchema),
    async (req, res, next) => {
        try {
            const validated = req.validated as z.infer<typeof verifyBuyerSchema>
            const params = validated.params
            await buyerController.verify({ id: params.buyerId })
            res.status(200).json({
                message: 'Successfully verified buyer',
            })
        } catch (e) {
            next(e)
        }
    },
)
