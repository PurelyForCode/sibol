import { ProductNamingService } from '../../../domain/product/services/ProductNamingService.js'
import { ProductOwnershipService } from '../../../domain/product/services/ProductOwnershipService.js'
import { ProductDescription } from '../../../domain/product/value_objects/ProductDescription.js'
import { ProductName } from '../../../domain/product/value_objects/ProductName.js'
import { ProductStock } from '../../../domain/product/value_objects/ProductStock.js'
import { IdGenerator } from '../../../domain/shared/interfaces/IdGenerator.js'
import { TransactionManager } from '../../../domain/shared/interfaces/TransactionManager.js'
import { InventoryMovementService } from '../../../domain/shared/services/InventoryMovementService.js'
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
    }>
}

export class UpdateProductUsecase {
    constructor(
        private readonly tm: TransactionManager,
        private readonly idGen: IdGenerator,
    ) {}

    async execute(cmd: UpdateProductCmd) {
        await this.tm.transaction(async uow => {
            const pr = uow.getProductRepo()
            const sr = uow.getSellerRepo()
            const ir = uow.getInventoryMovementRepo()

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
                const inventoryMovementService = new InventoryMovementService(
                    this.idGen,
                )
                const stock = ProductStock.create(
                    fields.stockQuantity,
                ).unwrapOrThrow('stock')
                const movement = inventoryMovementService.createMovement(
                    product,
                    stock,
                )
                product.changeStock(stock)
                await ir.save(movement)
            }
            await pr.save(product)
            await uow.publishEvents()
        })
    }
}
