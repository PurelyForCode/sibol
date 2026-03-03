import { EntityId, Id } from '../../shared/EntityId.js'
import { Repository } from '../../shared/interfaces/Repository.js'
import { Product } from '../aggregates/Product.js'
import { ProductNameUniquenessChecker } from '../interfaces/ProductNameUniquenessChecker.js'

export interface ProductRepository
    extends ProductNameUniquenessChecker, Repository<Product, EntityId> {
    findProducts(ids: EntityId[]): Promise<Map<Id, Product>>
}
