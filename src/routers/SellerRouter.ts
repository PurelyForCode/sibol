import { Router } from 'express'
import {
    applicationExceptionMapper,
    sellerController,
} from '../compositionRoot.js'
import z from 'zod'
import { inputValidation } from '../http/middleware/inputValidationMiddleware.js'
import { phoneNumberSchema } from '../http/validation/phoneNumberSchema.js'

export const sellerRouter = Router({ mergeParams: true })

const registerSellerSchema = z.object({
    body: z.object({
        description: z.string().nullable(),
        email: z.email(),
        password: z.string().min(8),
        storeName: z.string().min(3),
        storeSlug: z.string().min(3),
        supportEmail: z.email().nullable(),
        supportPhone: phoneNumberSchema.nullable(),
    }),
})

sellerRouter.post(
    '/register',
    inputValidation(registerSellerSchema),
    async (req, res, next) => {
        try {
            const validated = (
                req.validated as z.infer<typeof registerSellerSchema>
            ).body
            await sellerController.register({
                description: validated.description,
                email: validated.email,
                password: validated.password,
                storeName: validated.storeName,
                storeSlug: validated.storeSlug,
                supportEmail: validated.supportEmail,
                supportPhone: validated.supportPhone,
            })
            res.status(201).json({ message: 'Successfully created seller' })
        } catch (e) {
            next(e)
        }
    },
)
