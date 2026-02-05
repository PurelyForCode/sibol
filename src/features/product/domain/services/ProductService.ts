import { EntityId } from "../../../../lib/EntityId.js"
import { Money } from "../entities/Money.js"
import { Product } from "../entities/Product.js"
import { ProductDescription } from "../entities/ProductDescription.js"
import { ProductName } from "../entities/ProductName.js"
import { ProductRating } from "../entities/ProductRating.js"
import { ProductStock } from "../entities/ProductStock.js"
import { UnitOfMeasurement } from "../entities/UnitOfMeasurement.js"

type CreateProductInput = {
    id: EntityId,
    sellerId: EntityId,
    name: ProductName,
    description: ProductDescription | null,
    price: Money,
    stock: ProductStock,
    unit: UnitOfMeasurement,
    pricePerUnit: Money,
}

export class ProductService {
    create(input: CreateProductInput): Product {
        return Product.create(input.id, input.sellerId, input.name, input.description, input.stock, input.unit, input.price, null, null)
    }
}
