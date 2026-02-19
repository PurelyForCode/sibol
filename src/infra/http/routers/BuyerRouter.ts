import { Router } from 'express'
import z from 'zod'
import { buyerController } from '../../../compositionRoot.js'
import { validateInput } from '../middleware/InputValidationMiddleware.js'
import { Request, Response, NextFunction } from 'express'

export const buyerRouter = Router({ mergeParams: true })
const createBuyerRequestSchema = z.object({
    body: z.object({
        email: z.email(),
        password: z.string().min(8),
        username: z.string().min(3),
    }),
})

buyerRouter.post(
    '/register',
    validateInput(createBuyerRequestSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validated = req.validated as z.infer<
                typeof createBuyerRequestSchema
            >

            const body = validated.body

            await buyerController.register({
                email: body.email,
                password: body.password,
                username: body.username,
            })

            res.status(201).json({
                message: 'Successfully registered buyer account',
            })
        } catch (e: unknown) {
            next(e)
        }
    },
)
