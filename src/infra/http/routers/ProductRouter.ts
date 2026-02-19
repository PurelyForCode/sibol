import { NextFunction, Router, Request, Response } from 'express'
import z from 'zod'
import { fakeSellerId } from '../../../fakeData/fakeId.js'
import { validateInput } from '../middleware/InputValidationMiddleware.js'
import { productController } from '../../../compositionRoot.js'
import { unitOfMeasurementSchema } from '../validation/unitOfMeasurementSchema.js'

export const productRouter = Router({
    mergeParams: true,
})

// productRouter.get(
//     '/',
//     async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const products = await productQueryRepository.findAll()
//             res.status(200).json({ data: products })
//         } catch (e: unknown) {
//             next(e)
//         }
//     },
// )
//
// const getProductBySellerIdSchema = z.object({
//     params: z.object({ productId: z.uuidv7() }),
// })
//
// productRouter.get(
//     '/:productId',
//     validateInput(getProductBySellerIdSchema),
//     async (req: Request, res: Response, next: NextFunction) => {
//         try {
//             const validated = req.validated as z.infer<
//                 typeof getProductBySellerIdSchema
//             >
//             const productId = EntityId.create(validated.params.productId)
//             const products = await productQueryRepository.findById(productId)
//             res.status(200).json({ data: products })
//         } catch (e: unknown) {
//             next(e)
//         }
//     },
// )

const createProductRequestSchema = z.object({
    body: z.object({
        name: z.string(),
        price: z.int(),
        description: z.string().nullable(),
        unitOfMeasurement: unitOfMeasurementSchema,
    }),
})

productRouter.post(
    '/',
    validateInput(createProductRequestSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validated = req.validated as z.infer<
                typeof createProductRequestSchema
            >
            const body = validated.body
            const sellerId = fakeSellerId
            const { id } = await productController.createProduct({
                description: body.description,
                name: body.name,
                pricePerUnit: body.price,
                sellerId: sellerId,
                unitOfMeasurement: body.unitOfMeasurement,
            })
            res.status(201).json({ data: { productId: id } })
        } catch (e: unknown) {
            next(e)
        }
    },
)

const deleteProductBySellerSchema = z.object({
    params: z.object({ productId: z.uuidv7() }),
})

productRouter.delete(
    '/:productId',
    validateInput(deleteProductBySellerSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validated = req.validated as z.infer<
                typeof deleteProductBySellerSchema
            >
            const params = validated.params
            const productId = params.productId
            const sellerId = fakeSellerId
            await productController.deleteProduct({ productId, sellerId })
            res.status(204).end()
        } catch (e: unknown) {
            next(e)
        }
    },
)

// productRouter.put('/', (req: Request, res: Response, next: NextFunction) => {
//     try {
//     } catch (e: unknown) {}
// })
