import { EntityId } from '../../../../lib/EntityId.js'
import { QueryRepository } from '../../../../lib/interfaces/QueryRepository.js'
import { Repository } from '../../../../lib/interfaces/Repository.js'
import { RepositoryFactory } from '../../../../lib/interfaces/RepositoryFactory.js'
import { ProductDto } from '../../adapters/dto/ProductDto.js'
import { Product } from '../entities/product/Product.js'
import { ProductName } from '../entities/product/ProductName.js'

export interface ProductRepository extends Repository<Product, EntityId> {
    existsByNameAndSellerId(
        name: ProductName,
        sellerId: EntityId,
    ): Promise<boolean>
}

export interface ProductQueryRepository extends QueryRepository<
    ProductDto,
    EntityId
> {}

export interface ProductRepositoryFactory extends RepositoryFactory<ProductRepository> {}
