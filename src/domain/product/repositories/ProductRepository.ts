import { ProductSellUnitDto } from '../../../features/dto/ProductSellUnitDto.js'
import { SellUnitRow } from '../../../infra/db/tables/TableDefinitions.js'
import { EntityId, Id } from '../../shared/EntityId.js'
import { Repository } from '../../shared/interfaces/Repository.js'
import { Money } from '../../shared/value_objects/Money.js'
import { Product } from '../aggregates/Product.js'
import { ProductSellUnit } from '../entities/ProductSellUnit.js'
import { ProductNameUniquenessChecker } from '../interfaces/ProductNameUniquenessChecker.js'

export interface ProductRepository
    extends ProductNameUniquenessChecker, Repository<Product, EntityId> {
    findProducts(ids: EntityId[]): Promise<Map<Id, Product>>
    getSellUnitPricePerUnit(
        sellUnitId: EntityId,
        productId: EntityId,
    ): Promise<Money | null>
}
