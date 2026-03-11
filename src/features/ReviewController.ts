import {
    DeleteReviewCmd,
    DeleteReviewUsecase,
} from './reviews/DeleteReviewUsecase.js'
import {
    ReviewProductCmd,
    ReviewProductUsecase,
} from './reviews/ReviewProductUsecase.js'

export class ReviewController {
    constructor(
        private readonly reviewProductUsecase: ReviewProductUsecase,
        private readonly deleteReviewUsecase: DeleteReviewUsecase,
    ) {}

    async reviewProduct(cmd: ReviewProductCmd) {
        await this.reviewProductUsecase.execute(cmd)
    }

    async deleteReview(cmd: DeleteReviewCmd) {
        await this.deleteReviewUsecase.execute(cmd)
    }
}
