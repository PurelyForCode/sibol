import { Router } from 'express'
import { reviewController } from '../../../../compositionRoot.js'
import { validateInput } from '../../middleware/InputValidationMiddleware.js'
import z from 'zod'
import { fileStorage } from '../../../config/MulterConfig.js'
import { getRelativePath } from '../../../../utils/getRelativePath.js'
import { fakeBuyerId } from '../../../../fakeData/fakeId.js'

export const buyerReviewRouter = Router({ mergeParams: true })

const reviewProductRequestSchema = z.object({
    body: z.object({
        message: z.string().min(10).max(200),
        rating: z.number(),
        saleId: z.uuidv7(),
    }),
})
buyerReviewRouter.post(
    '/',
    validateInput(reviewProductRequestSchema),
    fileStorage.array('images'),
    async (req, res, next) => {
        try {
            const { body } = req.validated as z.infer<
                typeof reviewProductRequestSchema
            >
            const files = req.files as Express.Multer.File[]
            const paths = files.map(x => getRelativePath(x.path))
            await reviewController.reviewProduct({
                buyerId: fakeBuyerId,
                imagePaths: paths,
                message: body.message,
                rating: body.rating,
                saleId: body.saleId,
            })
            res.status(201).json({
                message: 'Successfully created review',
            })
        } catch (error) {
            next(error)
        }
    },
)

const deleteReviewRequestSchema = z.object({
    params: z.object({
        reviewId: z.uuidv7(),
    }),
})
buyerReviewRouter.delete(
    '/:reviewId',
    validateInput(reviewProductRequestSchema),
    async (req, res, next) => {
        try {
            const { params } = req.validated as z.infer<
                typeof deleteReviewRequestSchema
            >
            await reviewController.deleteReview({
                buyerId: fakeBuyerId,
                reviewId: params.reviewId,
            })
            res.status(204)
        } catch (error) {
            next(error)
        }
    },
)
