import { Router, Request, Response, NextFunction } from 'express'
import z from 'zod'
import { sellerController } from '../../../compositionRoot.js'
import { validateInput } from '../middleware/InputValidationMiddleware.js'
import { phoneNumberSchema } from '../validation/phoneNumberSchema.js'

export const sellerRouter = Router({
    mergeParams: true,
})
//
// sellerRouter.get(
//     '/',
//     async (req: Request, res: Response, next: NextFunction) => {
//         try {
//         } catch (e: unknown) {
//             next(e)
//         }
//     },
// )
//
// const getSellerBySellerIdSchema = z.object({
//     params: z.object({ sellerId: z.uuidv7() }),
// })
//
// sellerRouter.get(
//     '/:sellerId',
//     validateInput(getSellerBySellerIdSchema),
//     async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const validated = req.validated as z.infer<
//                 typeof getSellerBySellerIdSchema
//             >
//             const sellerId = EntityId.create(validated.params.sellerId)
//             const seller = await sellerQueryRepository.findById(sellerId)
//             if (!seller) {
//                 res.status(404).json({ message: 'Seller could not be found' })
//                 return
//             }
//
//             res.status(200).json({ data: seller })
//         } catch (e: unknown) {
//             next(e)
//         }
//     },
// )

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

sellerRouter.post(
    '/register',
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
            })

            res.status(201).json({
                message: 'Successfully registered seller account',
            })
        } catch (e: unknown) {
            next(e)
        }
    },
)
