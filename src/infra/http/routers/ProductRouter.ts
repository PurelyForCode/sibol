import { NextFunction, Router, Request, Response } from 'express'
import z from 'zod'
import { fakeSellerId } from '../../../fakeData/fakeId.js'
import { validateInput } from '../middleware/InputValidationMiddleware.js'
import {
    productController,
    productQueryRepository,
} from '../../../compositionRoot.js'
import { UnitOfMeasure } from '../domain/entities/product/UnitOfMeasurement.js'
import { EntityId } from '../../../lib/domain/EntityId.js'

export const productRouter = Router({
    mergeParams: true,
})

productRouter.get(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const products = await productQueryRepository.findAll()
            res.status(200).json({ data: products })
        } catch (e: unknown) {
            next(e)
        }
    },
)

const getProductBySellerIdSchema = z.object({
    params: z.object({ productId: z.uuidv7() }),
})

productRouter.get(
    '/:productId',
    validateInput(getProductBySellerIdSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const validated = req.validated as z.infer<
                typeof getProductBySellerIdSchema
            >
            const productId = EntityId.create(validated.params.productId)
            const products = await productQueryRepository.findById(productId)
            res.status(200).json({ data: products })
        } catch (e: unknown) {
            next(e)
        }
    },
)

const createProductRequestSchema = z.object({
    body: z.object({
        name: z.string(),
        price: z.int(),
        description: z.string().nullable(),
        unit: z.object({
            measurement: z.enum(
                Object.values(UnitOfMeasure) as [string, ...string[]],
            ),
            value: z.float32(),
        }),
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
                unit: {
                    measurement:
                        // basically saying that body.unit.measurement is a key of UnitOfMeasure enum
                        UnitOfMeasure[
                            body.unit.measurement as keyof typeof UnitOfMeasure
                        ],
                    value: body.unit.value,
                },
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

productRouter.put('/', (req: Request, res: Response, next: NextFunction) => {
    try {
    } catch (e: unknown) {}
})
