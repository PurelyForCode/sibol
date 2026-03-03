import { Product } from '../../../domain/product/aggregates/Product.js'
import { ProductNamingService } from '../../../domain/product/services/ProductNamingService.js'
import { ProductDescription } from '../../../domain/product/value_objects/ProductDescription.js'
import { ProductName } from '../../../domain/product/value_objects/ProductName.js'
import { IdGenerator } from '../../../domain/shared/interfaces/IdGenerator.js'
import { TransactionManager } from '../../../domain/shared/interfaces/TransactionManager.js'
import { SmallestUnitOfMeasurement } from '../../../domain/shared/value_objects/SmallestUnitOfMeasurement.js'
import { DuplicateProductNameException } from '../../../exceptions/product/DuplicateProductNameException.js'
import { SellerNotFoundByIdException } from '../../../exceptions/seller/SellerNotFoundByIdException.js'
import { EntityId } from '../../../domain/shared/EntityId.js'

export type CreateProductCmd = {
    description: string | null
    name: string
    sellerId: string
    unitOfMeasurement: string
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
            const namingService = new ProductNamingService(pr)

            // check if seller exists
            const sellerId = EntityId.create(cmd.sellerId)
            const seller = await sr.findById(sellerId)
            if (!seller) {
                throw new SellerNotFoundByIdException(cmd.sellerId)
            }
            seller.assertIsUnbanned()
            seller.assertIsVerified()

            const pName = ProductName.create(cmd.name).unwrapOrThrow(
                'productName',
            )
            namingService.assertNameIsUniqueWithinSellerStore(pName, sellerId)

            const pDescription = cmd.description
                ? ProductDescription.create(cmd.description).unwrapOrThrow(
                      'description',
                  )
                : null

            const unit = SmallestUnitOfMeasurement.create(
                cmd.unitOfMeasurement,
            ).unwrapOrThrow('unitOfMeasurement')

            const id = this.idGen.generate()
            const product = Product.new(id, sellerId, pName, pDescription, unit)
            await pr.save(product)
            return {
                id: product.id.value,
            }
        })
    }
}
