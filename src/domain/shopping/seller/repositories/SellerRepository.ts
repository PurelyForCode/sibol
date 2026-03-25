import { EntityId } from '../../../shared/EntityId.js'
import { QueryRepository } from '../../../shared/interfaces/QueryRepository.js'
import { Repository } from '../../../shared/interfaces/Repository.js'
import { SellerDto } from '../../../../features/dto/SellerDto.js'
import { Email } from '../../../shared/value_objects/Email.js'
import { Seller } from '../aggregates/Seller.js'
import { SellerUniquenessChecker } from '../interfaces/StoreUniquenessChecker.js'

export interface SellerRepository
    extends SellerUniquenessChecker, Repository<Seller, EntityId> {
    findByEmail(email: Email): Promise<Seller | null>
    hasStore(sellerId: EntityId): Promise<boolean>
}

export interface SellerQueryRepository extends QueryRepository<
    SellerDto,
    EntityId
> {}
