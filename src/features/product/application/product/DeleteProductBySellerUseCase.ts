import { EntityId } from "../../../../lib/EntityId.js"
import { AccountRepository } from "../../../account/domain/repositories/AccountRepository.js"
import { ProductRepository } from "../../domain/repositories/ProductRepository.js"

type DeleteProductBySellerInput = {
    sellerId: string,
    productId: string
}

export class DeleteProductBySellerUsecase {
    constructor(private readonly pr: ProductRepository, private readonly ar: AccountRepository) { }

    async execute(input: DeleteProductBySellerInput) {
        // check if seller exists
        const sellerId = new EntityId(input.sellerId)
        const seller = await this.ar.findById(sellerId)
        if (seller === null) {
            throw new Error("Seller account does not exist")
        }
        // check if product exists
        const productId = new EntityId(input.productId)
        const product = await this.pr.findById(productId)
        if (product === null) {
            throw new Error("Product not found")
        }
        // check if seller owns the product
        if (!product.sellerId.equals(sellerId)) {
            throw new Error("Can not delete product not owned by seller")
        }
        await this.pr.delete(product.id)
    }
}
