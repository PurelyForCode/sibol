import { ProductComplaint } from '../../../domain/complaint/aggregates/ProductComplaint.js'
import {
    ProductComplaintType,
    ProductComplaintTypeEnum,
} from '../../../domain/complaint/value_objects/ProductComplaintType.js'
import { EntityId } from '../../../domain/shared/EntityId.js'
import { IdGenerator } from '../../../domain/shared/interfaces/IdGenerator.js'
import { TransactionManager } from '../../../domain/shared/interfaces/TransactionManager.js'
import { ComplaintContent } from '../../../domain/shared/value_objects/ComplaintContent.js'
import { ProductNotFoundException } from '../../../exceptions/product/ProductNotFoundException.js'

export type CreateProductComplaintCmd = {
    productId: string
    authorId: string
    type: string
    content: string
}

export class CreateProductComplaintUsecase {
    constructor(
        private readonly tm: TransactionManager,
        private readonly idGen: IdGenerator,
    ) {}
    async execute(cmd: CreateProductComplaintCmd) {
        await this.tm.transaction(async uow => {
            const pr = uow.getProductRepo()
            const productId = EntityId.create(cmd.productId)
            const product = await pr.findById(productId)
            if (!product) {
                throw new ProductNotFoundException(cmd.productId)
            }

            const authorId = EntityId.create(cmd.authorId)

            const id = this.idGen.generate()
            const content = ComplaintContent.create(cmd.content).unwrapOrThrow(
                'content',
            )
            const type = ProductComplaintType.create(
                cmd.type as ProductComplaintTypeEnum,
            )

            const complaint = ProductComplaint.new(
                id,
                productId,
                authorId,
                content,
                type,
            )
        })
    }
}
