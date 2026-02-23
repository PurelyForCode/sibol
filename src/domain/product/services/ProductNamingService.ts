import { DuplicateProductNameException } from '../../../exceptions/product/DuplicateProductNameException.js'
import { EntityId } from '../../../lib/domain/EntityId.js'
import { ProductNameUniquenessChecker } from '../interfaces/ProductNameUniquenessChecker.js'
import { ProductName } from '../value_objects/ProductName.js'

export class ProductNamingService {
    constructor(
        private readonly uniquenessChecker: ProductNameUniquenessChecker,
    ) {}
    async assertNameIsUniqueWithinSellerStore(
        name: ProductName,
        sellerId: EntityId,
    ) {
        if (
            !(await this.uniquenessChecker.isNameUniqueWithinSellerStore(
                name,
                sellerId,
            ))
        ) {
            throw new DuplicateProductNameException(name.value)
        }
    }
}
