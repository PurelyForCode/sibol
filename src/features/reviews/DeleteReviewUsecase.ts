import { EntityId } from '../../domain/shared/EntityId.js'
import { ImageStorage } from '../../domain/shared/interfaces/ImageStorage.js'
import { TransactionManager } from '../../domain/shared/interfaces/TransactionManager.js'
import { BuyerNotFoundByIdException } from '../../exceptions/buyer/BuyerNotFoundByIdException.js'
import { ReviewNotFoundException } from '../../exceptions/review/ReviewNotFoundException.js'
import { InvalidResourceAccessException } from '../../exceptions/shared/InvalidResourceAccessException.js'

export type DeleteReviewCmd = {
    reviewId: string
    buyerId: string
}

export class DeleteReviewUsecase {
    constructor(
        private readonly tm: TransactionManager,
        private readonly imageStorage: ImageStorage,
    ) {}
    async execute(cmd: DeleteReviewCmd) {
        await this.tm.transaction(async uow => {
            const br = uow.getBuyerRepo()
            const rr = uow.getReviewRepo()

            const buyerId = EntityId.create(cmd.buyerId)
            const buyer = await br.findById(buyerId)
            if (!buyer) {
                throw new BuyerNotFoundByIdException(buyerId.value)
            }
            buyer.assertIsUnbanned()
            buyer.assertIsVerified()

            const reviewId = EntityId.create(cmd.reviewId)
            const review = await rr.findById(reviewId)
            if (!review) {
                throw new ReviewNotFoundException(reviewId.value, buyerId.value)
            }
            if (!review.buyerId.equals(buyer.id)) {
                throw new InvalidResourceAccessException()
            }
            for (const k of review.images.values()) {
                await this.imageStorage.delete(k.url)
            }
            await rr.delete(review.id)
        })
    }
}
