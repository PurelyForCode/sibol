import { EntityId } from '../../../lib/domain/EntityId.js'
import { Repository } from '../../shared/interfaces/Repository.js'
import { Product } from '../aggregates/Product.js'
import { ProductName } from '../value_objects/ProductName.js'

export interface ProductRepository extends Repository<Product, EntityId> {
    productExistsByNameAndSellerId(
        name: ProductName,
        sellerId: EntityId,
    ): Promise<boolean>
}
