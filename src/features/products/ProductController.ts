import {
    AddSellUnitCmd,
    AddSellUnitUsecase,
} from './add_sell_unit/AddSellUnitUsecase.js'
import {
    CreateProductCmd,
    CreateProductUsecase,
} from './create_product/CreateProductUsecase.js'
import {
    DeleteProductBySellerCmd,
    DeleteProductBySellerUsecase,
} from './delete_product/DeleteProductBySellerUsecase.js'
import {
    RemoveSellUnitCmd,
    RemoveSellUnitUsecase,
} from './remove_sell_unit/RemoveSellUnitUsecase.js'

export class ProductController {
    constructor(
        private readonly createUsecase: CreateProductUsecase,
        private readonly deleteUsecase: DeleteProductBySellerUsecase,
        private readonly addSellUnitUsecase: AddSellUnitUsecase,
        private readonly removeSellUnitUsecase: RemoveSellUnitUsecase,
    ) {}

    async createProduct(cmd: CreateProductCmd) {
        return await this.createUsecase.execute(cmd)
    }

    async deleteProduct(cmd: DeleteProductBySellerCmd) {
        return await this.deleteUsecase.execute(cmd)
    }

    async addSellUnit(cmd: AddSellUnitCmd) {
        return await this.addSellUnitUsecase.execute(cmd)
    }

    async removeSellUnit(cmd: RemoveSellUnitCmd) {
        await this.removeSellUnitUsecase.execute(cmd)
    }

    // async updateProduct(cmd: UpdateProductCmd) {}
}
