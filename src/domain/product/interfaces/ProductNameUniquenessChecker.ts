import { EntityId } from '../../../lib/domain/EntityId.js'
import { ProductName } from '../value_objects/ProductName.js'

export interface ProductNameUniquenessChecker {
    isNameUniqueWithinSellerStore(
        name: ProductName,
        sellerId: EntityId,
    ): Promise<boolean>
}
