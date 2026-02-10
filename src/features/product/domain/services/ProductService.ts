import { EntityId } from '../../../../lib/EntityId.js'
import { Money } from '../entities/product/Money.js'
import { Product } from '../entities/product/Product.js'
import { ProductDescription } from '../entities/product/ProductDescription.js'
import { ProductName } from '../entities/product/ProductName.js'
import { ProductStock } from '../entities/product/ProductStock.js'
import { UnitOfMeasurement } from '../entities/product/UnitOfMeasurement.js'

type CreateProductInput = {
    id: EntityId
    sellerId: EntityId
    name: ProductName
    description: ProductDescription | null
    stock: ProductStock
    unit: UnitOfMeasurement
    pricePerUnit: Money
}

type DeleteBySellerInput = {
    product: Product
}

export class ProductService {
    create(input: CreateProductInput): Product {
        const rating = null
        const deletedAt = null
        const now = new Date()
        return Product.create(
            input.id,
            input.sellerId,
            input.name,
            input.description,
            input.stock,
            input.unit,
            input.pricePerUnit,
            rating,
            now,
            now,
            deletedAt,
        )
    }

    deleteProductBySeller(input: DeleteBySellerInput) {
        const product = input.product
        const now = new Date()
        product.deletedAt = now
        return product
    }

    addPicture() {}

    removePicture() {}
}
