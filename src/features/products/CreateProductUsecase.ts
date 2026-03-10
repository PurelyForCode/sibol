import { Product } from '../../domain/product/aggregates/Product.js'
import { ProductNamingService } from '../../domain/product/services/ProductNamingService.js'
import { ProductDescription } from '../../domain/product/value_objects/ProductDescription.js'
import { ProductName } from '../../domain/product/value_objects/ProductName.js'
import { IdGenerator } from '../../domain/shared/interfaces/IdGenerator.js'
import { TransactionManager } from '../../domain/shared/interfaces/TransactionManager.js'
import { SmallestUnitOfMeasurement } from '../../domain/shared/value_objects/SmallestUnitOfMeasurement.js'
import { SellerNotFoundByIdException } from '../../exceptions/seller/SellerNotFoundByIdException.js'
import { EntityId } from '../../domain/shared/EntityId.js'
import { ProductImage } from '../../domain/product/entities/ProductImage.js'
import { ImagePath } from '../../domain/shared/value_objects/ImagePath.js'
import { ImagePosition } from '../../domain/shared/value_objects/ImagePosition.js'

export type CreateProductCmd = {
    description: string | null
    name: string
    sellerId: string
    unitOfMeasurement: string
    images: { url: string; position: number }[]
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
            const now = new Date()
            const images = []
            for (const image of cmd.images) {
                const path = ImagePath.create(image.url).unwrapOrThrow(
                    'imageUrl',
                )
                const position = ImagePosition.create(
                    image.position,
                ).unwrapOrThrow('imagePosition')
                images.push(
                    ProductImage.new(
                        this.idGen.generate(),
                        id,
                        path,
                        position,
                        now,
                    ),
                )
            }
            const product = Product.new(
                id,
                sellerId,
                pName,
                pDescription,
                unit,
                images,
            )
            await pr.save(product)
            return {
                id: product.id.value,
            }
        })
    }
}
