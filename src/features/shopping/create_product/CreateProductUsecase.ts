import { EntityId } from '../../../../../lib/EntityId.js'
import { IdGenerator } from '../../../../../lib/interfaces/IdGenerator.js'
import { TransactionManager } from '../../../../../lib/interfaces/TransactionManager.js'
import { SellerRepositoryFactory } from '../../../../../domain/buyer/repositories/SellerRepository.js'
import { Money } from '../../../domain/entities/product/Money.js'
import { Product } from '../../../domain/entities/product/Product.js'
import { ProductDescription } from '../../../domain/entities/product/ProductDescription.js'
import { ProductName } from '../../../domain/entities/product/ProductName.js'
import {
    UnitOfMeasure,
    UnitOfMeasurement,
} from '../../../domain/entities/product/UnitOfMeasurement.js'
import { ProductRepositoryFactory } from '../../../../../infra/db/repositories/ProductRepository.js'

export type CreateProductCmd = {
    description: string | null
    name: string
    pricePerUnit: number
    sellerId: string
    unit: {
        measurement: UnitOfMeasure
        value: number
    }
}

export class CreateProductUsecase {
    constructor(
        private readonly tm: TransactionManager,
        private readonly prf: ProductRepositoryFactory,
        private readonly srf: SellerRepositoryFactory,
        private readonly idGen: IdGenerator,
    ) {}

    async execute(input: CreateProductCmd) {
        return await this.tm.runInTransaction(async trx => {
            const pr = this.prf.create(trx)
            const ar = this.srf.create(trx)

            // check if seller exists
            const sellerId = EntityId.create(input.sellerId)
            if (!(await ar.existsById(sellerId))) {
                throw new Error('Seller account does not exist')
            }

            // check if name of product is duplicated
            const pName = ProductName.create(input.name)
            const duplicatedName = await pr.existsByNameAndSellerId(
                pName,
                sellerId,
            )

            if (duplicatedName) {
                throw new Error()
            }

            const pDescription = input.description
                ? ProductDescription.create(input.description)
                : null
            const pPrice = Money.create(input.pricePerUnit)
            if (input.unit.measurement === UnitOfMeasure.CM) {
            }
            const unit = UnitOfMeasurement.create(
                input.unit.measurement,
                input.unit.value,
            )

            const id = this.idGen.generate()
            const product = Product.new(
                id,
                sellerId,
                pName,
                pDescription,
                unit,
                pPrice,
            )

            await pr.save(product)

            return {
                id: product.id.value,
            }
        })
    }
}
