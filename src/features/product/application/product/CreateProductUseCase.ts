import { EntityId } from "../../../../lib/EntityId.js"
import { IdGenerator } from "../../../../lib/interfaces/IdGenerator.js"
import { AccountRepository } from "../../../account/domain/repositories/AccountRepository.js"
import { Money } from "../../domain/entities/Money.js"
import { ProductDescription } from "../../domain/entities/ProductDescription.js"
import { ProductName } from "../../domain/entities/ProductName.js"
import { ProductRating } from "../../domain/entities/ProductRating.js"
import { ProductStock } from "../../domain/entities/ProductStock.js"
import { UnitOfMeasure, UnitOfMeasurement } from "../../domain/entities/UnitOfMeasurement.js"
import { ProductRepository } from "../../domain/repositories/ProductRepository.js"
import { ProductService } from "../../domain/services/ProductService.js"

type CreateProductInput = {
    sellerId: string,
    name: string,
    description: string | null,
    price: number,
    stock: number,
    unitOfMeasurement: string
    unitValue: number
}


export class CreateProductUsecase {
    constructor(private readonly pr: ProductRepository, private readonly ar: AccountRepository, private readonly ps: ProductService, private readonly idGen: IdGenerator) { }

    async execute(input: CreateProductInput) {
        // check if seller exists
        const sellerId = new EntityId(input.sellerId)
        if (!(await this.ar.existsById(sellerId))) {
            throw new Error("Seller account does not exist")
        }

        // check if name of product is duplicated
        const pName = ProductName.create(input.name)
        const pDescription = input.description ? ProductDescription.create(input.description) : null
        const pPrice = Money.create(input.price)
        const pStock = ProductStock.create(input.stock)
        if (input.unitOfMeasurement === UnitOfMeasure.CM) {

        }
        const unit = UnitOfMeasurement.create( , input.unitValue)
        const id = this.idGen.generate()

        const product = this.ps.create({
            sellerId: sellerId,
            description: pDescription,
            id: id,
            name: pName,
            pricePerUnit: pPrice,
            stock: pStock,
            unit: 
        })

        await this.pr.create(product)

        return {
            id: product.id.value()
        }
    }
}
