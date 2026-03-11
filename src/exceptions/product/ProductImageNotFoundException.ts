import { AppException } from '../AppException.js'

export class ProductImageNotFoundException extends AppException {
    constructor(imageId: string, productId: string) {
        super(
            `Image with id ${imageId} in product with id '${productId}' not found`,
        )
    }
}
