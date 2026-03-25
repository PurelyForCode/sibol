import {
    AddSellUnitCmd,
    AddSellUnitUsecase,
} from '../features/shopping/products/AddSellUnitUsecase.js'
import {
    CreateProductCmd,
    CreateProductUsecase,
} from '../features/shopping/products/CreateProductUsecase.js'
import {
    ArchiveProductBySellerCmd,
    ArchiveProductBySellerUsecase,
} from '../features/shopping/products/ArchiveProductBySellerUsecase.js'
import {
    UpdateProductCmd,
    UpdateProductUsecase,
} from '../features/shopping/products/UpdateProductUsecase.js'
import {
    DiscontinueSellUnitCmd,
    DiscontinueSellUnitUsecase,
} from '../features/shopping/products/DiscontinueSellUnitUsecase.js'
import {
    AddImagesCmd,
    AddImagesUsecase,
} from '../features/shopping/products/AddImageUsecase.js'
import {
    RemoveImageCmd,
    RemoveImageUsecase,
} from '../features/shopping/products/RemoveImageUsecase.js'
import {
    MakeThumbnailCmd,
    MakeThumbnailUsecase,
} from '../features/shopping/products/MakeThumbnailUsecase.js'

export class ProductController {
    constructor(
        private readonly createUsecase: CreateProductUsecase,
        private readonly deleteUsecase: ArchiveProductBySellerUsecase,
        private readonly addSellUnitUsecase: AddSellUnitUsecase,
        private readonly discontinueSellUnitUsecase: DiscontinueSellUnitUsecase,
        private readonly updateProductUsecase: UpdateProductUsecase,
        private readonly addImagesUsecase: AddImagesUsecase,
        private readonly removeImageUsecase: RemoveImageUsecase,
        private readonly makeThumbnailUsecase: MakeThumbnailUsecase,
    ) {}

    async createProduct(cmd: CreateProductCmd) {
        return await this.createUsecase.execute(cmd)
    }

    async deleteProduct(cmd: ArchiveProductBySellerCmd) {
        return await this.deleteUsecase.execute(cmd)
    }

    async addSellUnit(cmd: AddSellUnitCmd) {
        return await this.addSellUnitUsecase.execute(cmd)
    }

    async discontinueSellUnit(cmd: DiscontinueSellUnitCmd) {
        await this.discontinueSellUnitUsecase.execute(cmd)
    }

    async updateProduct(cmd: UpdateProductCmd) {
        await this.updateProductUsecase.execute(cmd)
    }

    async addImages(cmd: AddImagesCmd) {
        await this.addImagesUsecase.execute(cmd)
    }

    async removeImage(cmd: RemoveImageCmd) {
        await this.removeImageUsecase.execute(cmd)
    }

    async makeThumnail(cmd: MakeThumbnailCmd) {
        await this.makeThumbnailUsecase.execute(cmd)
    }
}
