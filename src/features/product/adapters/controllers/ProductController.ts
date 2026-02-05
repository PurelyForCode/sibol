import { CreateProductUsecase } from "../../application/product/CreateProductUseCase.js";

export type CreateProductCommand = {
    description: string | null,
    name: string,
    price: number,
    rating: number,
    sellerId: string
}

export type DeleteProductCommand = {
    sellerId: string
    productId: string
}

export class ProductController {
    constructor(private readonly createProductUseCase: CreateProductUsecase) { }
    async createProduct(cmd: CreateProductCommand) {
        const { id } = await this.createProductUseCase.execute(
            {
                description: cmd.description,
                name: cmd.name,
                price: cmd.price,
                rating: cmd.rating,
                sellerId: cmd.sellerId
            }
        )
        return {
            id
        };
    }

    async deleteProduct(cmd: DeleteProductCommand) {

    }
}
