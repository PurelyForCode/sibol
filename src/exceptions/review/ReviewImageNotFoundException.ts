import { AppException } from '../AppException.js'

export class ReviewImageNotFoundException extends AppException {
    constructor(imageId: string, reviewId: string) {
        super(
            `Image with id '${imageId}' was not found on review with id '${reviewId}'`,
        )
    }
}
