import {
    AddSellUnitCmd,
    AddSellUnitUsecase,
} from './products/AddSellUnitUsecase.js'
import {
    CreateProductCmd,
    CreateProductUsecase,
} from './products/CreateProductUsecase.js'
import {
    ArchiveProductBySellerCmd,
    ArchiveProductBySellerUsecase,
} from './products/ArchiveProductBySellerUsecase.js'
import {
    UpdateProductCmd,
    UpdateProductUsecase,
} from './products/UpdateProductUsecase.js'
import {
    DiscontinueSellUnitCmd,
    DiscontinueSellUnitUsecase,
} from './products/DiscontinueSellUnitUsecase.js'
import { AddImagesCmd, AddImagesUsecase } from './products/AddImageUsecase.js'
import {
    RemoveImageCmd,
    RemoveImageUsecase,
} from './products/RemoveImageUsecase.js'
import {
    MakeThumbnailCmd,
    MakeThumbnailUsecase,
} from './products/MakeThumbnailUsecase.js'

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
