import {
    ArchiveProductCmd,
    ArchiveProductUsecase,
} from '../usecases/products/ArchiveProductUsecase.js'
import {
    CreateProductCmd,
    CreateProductUsecase,
} from '../usecases/products/CreateProductUsecase.js'
import {
    UpdateProductCmd,
    UpdateProductUsecase,
} from '../usecases/products/UpdateProductUsecase.js'

export class ProductController {
    constructor(
        private readonly createUsecase: CreateProductUsecase,
        private readonly archiveUsecase: ArchiveProductUsecase,
        private readonly updateUsecase: UpdateProductUsecase,
    ) {}

    async createProduct(cmd: CreateProductCmd) {
        await this.createUsecase.execute(cmd)
    }

    async archiveProduct(cmd: ArchiveProductCmd) {
        await this.archiveUsecase.execute(cmd)
    }

    async updateProduct(cmd: UpdateProductCmd) {
        await this.updateUsecase.execute(cmd)
    }

    addPricing() {}
    removePricing() {}
    updatePricing() {}

    addImage() {}
    removeImage() {}

    addReview() {}
    removeReview() {}
    updateReview() {}

    createComplaint() {}
    removeComplaint() {}
}
