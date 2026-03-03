import { Router, Request, Response, NextFunction } from 'express'
import z from 'zod'
import { buyerController, sellerController } from '../../../compositionRoot.js'
import { validateInput } from '../middleware/InputValidationMiddleware.js'
import { phoneNumberSchema } from '../validation/phoneNumberSchema.js'
import {
    fakeBuyerAddressId,
    fakeSellerAddressId,
} from '../../../fakeData/fakeId.js'

export const registrationRouter = Router({
    mergeParams: true,
})

const createSellerRequestSchema = z.object({
    body: z.object({
        email: z.email(),
        password: z.string().min(8),
        storeName: z.string().min(3),
        storeSlug: z.string().min(3),
        description: z.string().nullable(),
        supportEmail: z.email().nullable(),
        supportPhone: phoneNumberSchema.nullable(),
    }),
})

registrationRouter.post(
    '/sellers/register',
    validateInput(createSellerRequestSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body } = req.validated as z.infer<
                typeof createSellerRequestSchema
            >

            await sellerController.register({
                email: body.email,
                storeSlug: body.storeSlug,
                password: body.password,
                storeName: body.storeName,
                description: body.description,
                supportEmail: body.supportEmail,
                supportPhone: body.supportPhone,
                addressId: fakeSellerAddressId,
            })

            res.status(201).json({
                message: 'Successfully registered seller account',
            })
        } catch (e: unknown) {
            next(e)
        }
    },
)

const createBuyerRequestSchema = z.object({
    body: z.object({
        email: z.email(),
        password: z.string().min(8),
        username: z.string().min(3),
    }),
})

registrationRouter.post(
    '/buyers/register',
    validateInput(createBuyerRequestSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body } = req.validated as z.infer<
                typeof createBuyerRequestSchema
            >

            await buyerController.register({
                email: body.email,
                password: body.password,
                username: body.username,
                addressId: fakeBuyerAddressId,
            })

            res.status(201).json({
                message: 'Successfully registered buyer account',
            })
        } catch (e: unknown) {
            next(e)
        }
    },
)
