import { AppException } from '../AppException.js'

export class ReviewNotFoundException extends AppException {
    constructor(reviewId: string, buyerId: string) {
        super(
            `Review with id '${reviewId}' created by Buyer with id '${buyerId}' was not found`,
        )
    }
}
