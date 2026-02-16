import { NextFunction, Router, Request, Response } from 'express'
import z from 'zod'
import { inputValidation } from '../middleware/inputValidationMiddleware.js'
import { productController } from '../../../compositionRoot.js'
import { seededSellerId } from './seeded_values.js'
import { UnitOfMeasurement } from '../../../domain/model/product/UnitOfMeasurement.js'

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
        description: z.string().nullable(),
        baseUnit: z.enum(
            Object.values(UnitOfMeasurement) as [
                UnitOfMeasurement,
                ...UnitOfMeasurement[],
            ],
        ),
    }),
})

productRouter.post(
    '/',
    inputValidation(createProductRequestSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body } = req.validated as z.infer<
                typeof createProductRequestSchema
            >

            const sellerId = seededSellerId

            await productController.createProduct({
                name: body.name,
                description: body.description,
                baseUnit: body.baseUnit,
                sellerId,
            })
            res.status(201).json({ message: 'Product created' })
        } catch (e) {
            next(e)
        }
    },
)

const deleteProductBySellerSchema = z.object({
    params: z.object({ productId: z.uuidv7() }),
})

productRouter.delete(
    '/:productId',
    inputValidation(deleteProductBySellerSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validated = req.validated as z.infer<
                typeof deleteProductBySellerSchema
            >
            const params = validated.params
            const productId = params.productId
            const sellerId = seededSellerId

            await productController.archiveProduct({ productId, sellerId })
            res.status(204).end()
        } catch (e: unknown) {
            next(e)
        }
    },
)

const patchProductSchema = z.object({
    body: z
        .object({
            name: z.string().min(3),
            description: z.string().nullable(),
        })
        .partial(),
    params: z.object({
        productId: z.uuidv7(),
    }),
})

productRouter.patch(
    '/:productId',
    inputValidation(patchProductSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validated = req.validated as z.infer<
                typeof patchProductSchema
            >
            const body = validated.body
            const params = validated.params
            await productController.updateProduct({
                productId: params.productId,
                sellerId: seededSellerId,
                description: body.description,
                name: body.name,
            })
            res.status(200).json({ message: 'Successfully updated product' })
        } catch (e: unknown) {
            next(e)
        }
    },
)
