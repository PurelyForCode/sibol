import {
    CreateProductCmd,
    CreateProductUsecase,
} from '../../application/product/usecases/CreateProductUsecase.js'
import {
    DeleteProductBySellerCmd,
    DeleteProductBySellerUsecase,
} from '../../application/product/usecases/DeleteProductBySellerUsecase.js'
import { UpdateProductCmd } from '../../application/product/usecases/UpdateProductUsecase.js'

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
