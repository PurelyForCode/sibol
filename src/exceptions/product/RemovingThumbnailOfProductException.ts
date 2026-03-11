import { AppException } from '../AppException.js'

export class RemovingThumbnailOfProductException extends AppException {
    constructor() {
        super(
            'Removing thumbnail of product is not allowed, change the thumbnail first',
        )
    }
}
