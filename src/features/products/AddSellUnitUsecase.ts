import { ProductOwnershipService } from '../../domain/product/services/ProductOwnershipService.js'
import { SellUnitDisplayName } from '../../domain/product/value_objects/SellUnitDisplayName.js'
import { IdGenerator } from '../../domain/shared/interfaces/IdGenerator.js'
import { TransactionManager } from '../../domain/shared/interfaces/TransactionManager.js'
import { Money } from '../../domain/shared/value_objects/Money.js'
import { UnitOfMeasurement } from '../../domain/shared/value_objects/UnitOfMeasurement.js'
import { ConversionFactor } from '../../domain/shared/value_objects/ConversionFactor.js'
import { ProductNotFoundException } from '../../exceptions/product/ProductNotFoundException.js'
import { SellerNotFoundByIdException } from '../../exceptions/seller/SellerNotFoundByIdException.js'
import { EntityId } from '../../domain/shared/EntityId.js'

export type AddSellUnitCmd = {
    sellerId: string
    productId: string
    unitSymbol: string
    conversionFactor: number
    pricePerUnit: number
    displayName: string
}

export class AddSellUnitUsecase {
    constructor(
        private readonly tm: TransactionManager,
        private readonly idGen: IdGenerator,
    ) {}

    async execute(cmd: AddSellUnitCmd) {
        await this.tm.transaction(async uow => {
            const pr = uow.getProductRepo()
            const sr = uow.getSellerRepo()

            const sellerId = EntityId.create(cmd.sellerId)
            const seller = await sr.findById(sellerId)
            if (!seller) {
                throw new SellerNotFoundByIdException(cmd.sellerId)
            }
            seller.assertIsUnbanned()
            seller.assertIsVerified()

            const productId = EntityId.create(cmd.productId)
            const product = await pr.findById(productId)
            if (!product) {
                throw new ProductNotFoundException(cmd.productId)
            }
            ProductOwnershipService.assertSellerOwnsProduct(seller, product)

            const id = this.idGen.generate()
            const unitSymbol = UnitOfMeasurement.create(
                cmd.unitSymbol,
            ).unwrapOrThrow('unitOfMeasurement')
            const conversionFactor = ConversionFactor.create(
                cmd.conversionFactor,
            ).unwrapOrThrow('conversionFactor')
            const pricePerUnit = Money.create(cmd.pricePerUnit).unwrapOrThrow(
                'pricePerUnit',
            )
            const displayName = SellUnitDisplayName.create(
                cmd.displayName,
            ).unwrapOrThrow('displayName')

            product.addSellUnit(
                id,
                unitSymbol,
                conversionFactor,
                pricePerUnit,
                displayName,
            )
            await pr.save(product)
        })
    }
}
