import { Product } from '../../../domain/product/aggregates/Product.js'
import { ProductDescription } from '../../../domain/product/value_objects/ProductDescription.js'
import { ProductName } from '../../../domain/product/value_objects/ProductName.js'
import { IdGenerator } from '../../../domain/shared/interfaces/IdGenerator.js'
import { TransactionManager } from '../../../domain/shared/interfaces/TransactionManager.js'
import { Money } from '../../../domain/shared/value_objects/Money.js'
import { UnitOfMeasurement } from '../../../domain/shared/value_objects/UnitOfMeasurement.js'
import { DuplicateProductNameException } from '../../../exceptions/product/DuplicateProductNameException.js'
import { EntityId } from '../../../lib/domain/EntityId.js'

export type CreateProductCmd = {
    description: string | null
    name: string
    sellerId: string
    unitOfMeasurement: string
    pricePerUnit: number
}

export class CreateProductUsecase {
    constructor(
        private readonly tm: TransactionManager,
        private readonly idGen: IdGenerator,
    ) {}

    async execute(cmd: CreateProductCmd) {
        return await this.tm.transaction(async uow => {
            const sr = uow.getSellerRepo()
            const pr = uow.getProductRepo()
            // check if seller exists
            const sellerId = EntityId.create(cmd.sellerId)
            if (!(await sr.existsById(sellerId))) {
                throw new Error('Seller account does not exist')
            }

            // check if name of product is duplicated
            const pName = ProductName.create(cmd.name).unwrapOrThrow(
                'productName',
            )
            const duplicatedName = await pr.existsByNameAndSellerId(
                pName,
                sellerId,
            )

            if (duplicatedName) {
                throw new DuplicateProductNameException(cmd.name)
            }

            const pDescription = cmd.description
                ? ProductDescription.create(cmd.description).unwrapOrThrow(
                      'description',
                  )
                : null

            const unit = UnitOfMeasurement.create(
                cmd.unitOfMeasurement,
            ).unwrapOrThrow('unitOfMeasurement')
            const price = Money.create(cmd.pricePerUnit).unwrapOrThrow(
                'pricePerUnit',
            )

            const id = this.idGen.generate()
            const product = Product.new(
                id,
                sellerId,
                pName,
                pDescription,
                unit,
                price,
            )

            await pr.save(product)

            return {
                id: product.id.value,
            }
        })
    }
}
