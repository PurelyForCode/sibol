import {
    AddSellUnitCmd,
    AddSellUnitUsecase,
} from './add_sell_unit/AddSellUnitUsecase.js'
import {
    CreateProductCmd,
    CreateProductUsecase,
} from './create_product/CreateProductUsecase.js'
import {
    ArchiveProductBySellerCmd,
    ArchiveProductBySellerUsecase,
} from './archive_product/ArchiveProductBySellerUsecase.js'
import {
    UpdateProductCmd,
    UpdateProductUsecase,
} from './update_product/UpdateProductUsecase.js'
import {
    DiscontinueSellUnitCmd,
    DiscontinueSellUnitUsecase,
} from './discontinue_sell_unit/DiscontinueSellUnitUsecase.js'

export class ProductController {
    constructor(
        private readonly createUsecase: CreateProductUsecase,
        private readonly deleteUsecase: ArchiveProductBySellerUsecase,
        private readonly addSellUnitUsecase: AddSellUnitUsecase,
        private readonly discontinueSellUnitUsecase: DiscontinueSellUnitUsecase,
        private readonly updateProductUsecase: UpdateProductUsecase,
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
}
