import { NextFunction, Router, Request, Response } from 'express'
import z from 'zod'
import { fakeSellerId } from '../../../fakeData/fakeId.js'
import { validateInput } from '../middleware/InputValidationMiddleware.js'
import {
    productController,
    productQueryRepository,
    productSellUnitQueryRepository,
} from '../../../compositionRoot.js'
import { unitOfMeasurementSchema } from '../validation/unitOfMeasurementSchema.js'
import { UnitOfMeasurement } from '../../../domain/shared/value_objects/UnitOfMeasurement.js'
import { remove } from 'lodash'
import { EntityId } from '../../../lib/domain/EntityId.js'
import { ProductSellUnitNotFoundException } from '../../../exceptions/product/ProductSellUnitNotFoundException.js'

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
            const { params } = req.validated as z.infer<
                typeof getProductBySellerIdSchema
            >
            const productId = EntityId.create(params.productId)
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
        unitOfMeasurement: unitOfMeasurementSchema,
    }),
})

productRouter.post(
    '/',
    validateInput(createProductRequestSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { body } = req.validated as z.infer<
                typeof createProductRequestSchema
            >
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
            const { params } = req.validated as z.infer<
                typeof deleteProductBySellerSchema
            >
            const productId = params.productId
            const sellerId = fakeSellerId
            await productController.deleteProduct({ productId, sellerId })
            res.status(204).end()
        } catch (e: unknown) {
            next(e)
        }
    },
)

const addSellUnitRequestSchema = z.object({
    body: z.object({
        unit: z.enum(UnitOfMeasurement.unitValues),
    }),
    params: z.object({
        productId: z.uuidv7(),
    }),
})

const getSellUnitsRequestSchema = z.object({
    params: z.object({ productId: z.uuidv7() }),
})
productRouter.get(
    '/:productId/sell-units',
    validateInput(getSellUnitsRequestSchema),
    async (req, res, next) => {
        const { params } = req.validated as z.infer<
            typeof getSellUnitsRequestSchema
        >

        const sellUnits =
            await productSellUnitQueryRepository.findAllByProductId(
                params.productId,
            )
        res.status(200).json({ data: sellUnits })
    },
)

const getSellUnitByIdRequestSchema = z.object({
    params: z.object({ productId: z.uuidv7(), sellUnitId: z.uuidv7() }),
})
productRouter.get(
    '/:productId/sell-units/:sellUnitId',
    validateInput(getSellUnitByIdRequestSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { params } = req.validated as z.infer<
                typeof getSellUnitByIdRequestSchema
            >
            const sellUnit = await productSellUnitQueryRepository.findById(
                params.sellUnitId,
                params.productId,
            )

            if (!sellUnit) {
                throw new ProductSellUnitNotFoundException(
                    params.sellUnitId,
                    params.productId,
                )
            }
            res.status(200).json({ data: sellUnit })
        } catch (e) {
            next(e)
        }
    },
)

productRouter.post(
    '/:productId/sell-units',
    validateInput(addSellUnitRequestSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { params, body } = req.validated as z.infer<
                typeof addSellUnitRequestSchema
            >
            const sellerId = fakeSellerId

            await productController.addSellUnit({
                productId: params.productId,
                sellerId: sellerId,
                unit: body.unit,
            })
            res.status(201).json({ message: 'Successfully added sell unit' })
        } catch (e) {
            next(e)
        }
    },
)

const removeSellUnitRequestSchema = z.object({
    params: z.object({
        productId: z.uuidv7(),
        sellUnitId: z.uuidv7(),
    }),
})

productRouter.delete(
    '/:productId/sell-units/:sellUnitId',
    validateInput(addSellUnitRequestSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { params } = req.validated as z.infer<
                typeof removeSellUnitRequestSchema
            >
            const sellerId = fakeSellerId

            await productController.removeSellUnit({
                productId: params.productId,
                sellerId: sellerId,
                sellUnitId: params.sellUnitId,
            })
            res.status(204)
        } catch (e) {
            next(e)
        }
    },
)

// productRouter.put('/', (req: Request, res: Response, next: NextFunction) => {
//     try {
//     } catch (e: unknown) {}
// })
