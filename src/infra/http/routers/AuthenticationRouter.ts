import { Router } from 'express'
import { validateInput } from '../middleware/InputValidationMiddleware.js'
import { z } from 'zod'
import { authenticationController } from '../../../compositionRoot.js'

export const authenticationRouter = Router({ mergeParams: true })

const loginSellerSchema = z.object({
    body: z.object({
        email: z.email(),
        password: z.string().min(8),
    }),
})

authenticationRouter.post(
    '/login/seller',
    validateInput(loginSellerSchema),
    async (req, res, next) => {
        try {
            const { body } = req.validated as z.infer<typeof loginSellerSchema>
            const token = await authenticationController.loginSeller({
                email: body.email,
                password: body.password,
            })
            res.status(200).json({ data: token })
        } catch (e) {
            next(e)
        }
    },
)

const loginBuyerSchema = z.object({
    body: z.object({
        email: z.email(),
        password: z.string().min(8),
    }),
})

authenticationRouter.post(
    '/login/buyer',
    validateInput(loginBuyerSchema),
    async (req, res, next) => {
        try {
            const { body } = req.validated as z.infer<typeof loginBuyerSchema>
            const token = await authenticationController.loginBuyer({
                email: body.email,
                password: body.password,
            })
            res.status(200).json({ data: token })
        } catch (e) {
            next(e)
        }
    },
)
