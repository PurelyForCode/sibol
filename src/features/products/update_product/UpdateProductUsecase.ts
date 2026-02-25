import { ProductNamingService } from '../../../domain/product/services/ProductNamingService.js'
import { ProductOwnershipService } from '../../../domain/product/services/ProductOwnershipService.js'
import { ProductDescription } from '../../../domain/product/value_objects/ProductDescription.js'
import { ProductName } from '../../../domain/product/value_objects/ProductName.js'
import { ProductStock } from '../../../domain/product/value_objects/ProductStock.js'
import { TransactionManager } from '../../../domain/shared/interfaces/TransactionManager.js'
import { Money } from '../../../domain/shared/value_objects/Money.js'
import { UnitOfMeasurement } from '../../../domain/shared/value_objects/UnitOfMeasurement.js'
import { ProductNotFoundException } from '../../../exceptions/product/ProductNotFoundException.js'
import { SellerNotFoundByIdException } from '../../../exceptions/seller/SellerNotFoundByIdException.js'
import { EntityId } from '../../../lib/domain/EntityId.js'

export type UpdateProductCmd = {
    productId: string
    sellerId: string
    fields: Partial<{
        name: string
        description: string
        stockQuantity: number
        baseUnit: string
        pricePerUnit: number
    }>
}

export class UpdateProductUsecase {
    constructor(private readonly tm: TransactionManager) {}

    async execute(cmd: UpdateProductCmd) {
        await this.tm.transaction(async uow => {
            const pr = uow.getProductRepo()
            const sr = uow.getSellerRepo()

            const sellerId = EntityId.create(cmd.sellerId)
            const seller = await sr.findById(sellerId)
            if (!seller) {
                throw new SellerNotFoundByIdException(sellerId.value)
            }
            seller.assertIsUnbanned()
            seller.assertIsVerified()

            const productId = EntityId.create(cmd.productId)
            const product = await pr.findById(productId)
            if (!product) {
                throw new ProductNotFoundException(productId.value)
            }
            ProductOwnershipService.assertSellerOwnsProduct(seller, product)

            const fields = cmd.fields
            if (fields.baseUnit) {
                const baseUnit = UnitOfMeasurement.create(
                    fields.baseUnit,
                ).unwrapOrThrow('baseUnit')
                product.changeBaseUnit(baseUnit)
            }

            if (fields.pricePerUnit) {
                const pricePerUnit = Money.create(
                    fields.pricePerUnit,
                ).unwrapOrThrow('pricePerUnit')
                product.changePricePerUnit(pricePerUnit)
            }

            if (fields.name) {
                const name = ProductName.create(fields.name).unwrapOrThrow(
                    'name',
                )
                const namingService = new ProductNamingService(pr)
                await namingService.assertNameIsUniqueWithinSellerStore(
                    name,
                    sellerId,
                )
                product.changeName(name)
            }

            if (fields.description) {
                const description = ProductDescription.create(
                    fields.description,
                ).unwrapOrThrow('description')
                product.changeDescription(description)
            }

            if (fields.stockQuantity) {
                const stockQuantity = ProductStock.create(
                    fields.stockQuantity,
                ).unwrapOrThrow('stockQuantity')
                product.changeStockQuantity(stockQuantity)
            }

            await pr.save(product)
            await uow.publishEvents()
        })
    }
}
