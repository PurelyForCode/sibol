import { NextFunction, Router, Request, Response } from 'express'
import z from 'zod'
import {
    productQueryRepository,
    productSellUnitQueryRepository,
} from '../../../../compositionRoot.js'
import { validateInput } from '../../middleware/InputValidationMiddleware.js'
import { ProductSellUnitNotFoundException } from '../../../../exceptions/product/ProductSellUnitNotFoundException.js'

export const buyerProductRouter = Router({
    mergeParams: true,
})

const getCatalogueRequestSchema = z.object({
    query: z.object({
        sellerId: z.uuidv7().optional(),
        limit: z.int().positive().optional(),
        offset: z.int().positive().optional(),
    }),
})

buyerProductRouter.get(
    '/',
    validateInput(getCatalogueRequestSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { query } = req.validated as z.infer<
                typeof getCatalogueRequestSchema
            >
            const products =
                await productQueryRepository.findProductCatalogueItems(
                    {
                        sellerId: query.sellerId,
                    },
                    { limit: query.limit, offset: query.offset },
                )
            res.status(200).json({ data: products })
        } catch (e: unknown) {
            next(e)
        }
    },
)

const getProductBySellerIdSchema = z.object({
    params: z.object({ productId: z.uuidv7() }),
})
buyerProductRouter.get(
    '/:productId',
    validateInput(getProductBySellerIdSchema),
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            const { params } = req.validated as z.infer<
                typeof getProductBySellerIdSchema
            >
            const products =
                await productQueryRepository.findActiveProductDetailById(
                    params.productId,
                )
            if (products) {
                res.status(200).json({ data: products })
            } else {
                res.status(404).end()
            }
        } catch (e: unknown) {
            next(e)
        }
    },
)

const getSellUnitsRequestSchema = z.object({
    params: z.object({ productId: z.uuidv7() }),
})
buyerProductRouter.get(
    '/:productId/sell-units',
    validateInput(getSellUnitsRequestSchema),
    async (req, res, next) => {
        try {
            const { params } = req.validated as z.infer<
                typeof getSellUnitsRequestSchema
            >

            const sellUnits =
                await productSellUnitQueryRepository.findAllByProductId(
                    params.productId,
                )
            res.status(200).json({ data: sellUnits })
        } catch (e) {
            next(e)
        }
    },
)

const getSellUnitByIdRequestSchema = z.object({
    params: z.object({ productId: z.uuidv7(), sellUnitId: z.uuidv7() }),
})
buyerProductRouter.get(
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
