import { Review } from '../../../domain/review/Review.js'
import { ReviewMessage } from '../../../domain/review/ReviewMessage.js'
import { EntityId } from '../../../domain/shared/EntityId.js'
import { IdGenerator } from '../../../domain/shared/interfaces/IdGenerator.js'
import { TransactionManager } from '../../../domain/shared/interfaces/TransactionManager.js'
import { ImagePath } from '../../../domain/shared/value_objects/ImagePath.js'
import { Rating } from '../../../domain/shared/value_objects/Rating.js'
import { BuyerNotFoundByIdException } from '../../../exceptions/buyer/BuyerNotFoundByIdException.js'
import { BuyerHasAlreadyReviewedSaleException } from '../../../exceptions/review/BuyerHasAlreadyReviewedSaleException.js'
import { SaleNotFoundException } from '../../../exceptions/sale/SaleNotFoundException.js'
import { InvalidResourceAccessException } from '../../../exceptions/shared/InvalidResourceAccessException.js'

export type ReviewProductCmd = {
    saleId: string
    buyerId: string
    rating: number
    message: string | null
    imagePaths: string[]
}

export class ReviewProductUsecase {
    constructor(
        private readonly tm: TransactionManager,
        private readonly idGen: IdGenerator,
    ) {}
    async execute(cmd: ReviewProductCmd) {
        await this.tm.transaction(async uow => {
            const br = uow.getBuyerRepo()
            const rr = uow.getReviewRepo()
            const sr = uow.getSaleRepo()

            const saleId = EntityId.create(cmd.saleId)
            const sale = await sr.findById(saleId)
            if (!sale) {
                throw new SaleNotFoundException(cmd.saleId)
            }

            const buyerId = EntityId.create(cmd.buyerId)
            if (sale.buyerId.equals(buyerId)) {
                throw new InvalidResourceAccessException()
            }

            const buyer = await br.findById(buyerId)
            if (!buyer) {
                throw new BuyerNotFoundByIdException(buyerId.value)
            }
            buyer.assertIsUnbanned()
            buyer.assertIsVerified()

            // one review per purchase
            if (await rr.hasBuyerReviewedTheirSale(saleId, buyerId)) {
                throw new BuyerHasAlreadyReviewedSaleException(
                    buyerId.value,
                    saleId.value,
                )
            }

            const message = cmd.message
                ? ReviewMessage.create(cmd.message).unwrapOrThrow('message')
                : null
            const rating = Rating.create(cmd.rating).unwrapOrThrow('rating')
            const now = new Date()
            const review = Review.new(
                this.idGen.generate(),
                buyerId,
                saleId,
                message,
                rating,
                now,
                now,
            )
            for (const path of cmd.imagePaths) {
                const imagePath =
                    ImagePath.create(path).unwrapOrThrow('imageUrl')
                review.addImage(this.idGen.generate(), imagePath)
            }
            await rr.save(review)
        })
    }
}
