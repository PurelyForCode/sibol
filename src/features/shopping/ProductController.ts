import {
    CreateProductCmd,
    CreateProductUsecase,
} from './create_product/CreateProductUsecase.js'
import {
    DeleteProductBySellerCmd,
    DeleteProductBySellerUsecase,
} from './delete_product/DeleteProductBySellerUsecase.js'
import { UpdateProductCmd } from './update_product/UpdateProductUsecase.js'

export class ProductController {
    constructor(
        private readonly createUsecase: CreateProductUsecase,
        private readonly deleteUsecase: DeleteProductBySellerUsecase,
    ) {}

    async createProduct(cmd: CreateProductCmd) {
        return await this.createUsecase.execute(cmd)
    }

    async deleteProduct(cmd: DeleteProductBySellerCmd) {
        return await this.deleteUsecase.execute(cmd)
    }

    async updateProduct(cmd: UpdateProductCmd) {}
}
