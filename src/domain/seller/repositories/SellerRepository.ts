import { EntityId } from '../../../lib/domain/EntityId.js'
import { QueryRepository } from '../../shared/interfaces/QueryRepository.js'
import { Repository } from '../../shared/interfaces/Repository.js'
import { SellerDto } from '../../../features/dto/SellerDto.js'
import { Email } from '../../shared/value_objects/Email.js'
import { Seller } from '../aggregates/Seller.js'
import { StoreName } from '../value_objects/StoreName.js'
import { StoreSlug } from '../value_objects/StoreSlug.js'

export interface SellerRepository extends Repository<Seller, EntityId> {
    existsByEmail(email: Email): Promise<boolean>
    findByEmail(email: Email): Promise<Seller | null>
    findByStoreName(storeName: StoreName): Promise<Seller | null>
    findByStoreSlug(slug: StoreSlug): Promise<Seller | null>
}

export interface SellerQueryRepository extends QueryRepository<
    SellerDto,
    EntityId
> {}
