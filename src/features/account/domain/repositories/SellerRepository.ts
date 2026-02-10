import { EntityId } from '../../../../lib/EntityId.js'
import { QueryRepository } from '../../../../lib/interfaces/QueryRepository.js'
import { Repository } from '../../../../lib/interfaces/Repository.js'
import { RepositoryFactory } from '../../../../lib/interfaces/RepositoryFactory.js'
import { SellerDto } from '../../adapter/dto/SellerDto.js'
import { Email } from '../entities/Email.js'
import { HashedPassword } from '../entities/HashedPassword.js'
import { Seller } from '../entities/seller/Seller.js'
import { SellerCredential } from '../entities/seller/SellerCredential.js'

export interface SellerRepository extends Repository<Seller, EntityId> {
    register(T: { seller: Seller; passwordHash: HashedPassword }): Promise<void>
    existsByEmail(email: Email): Promise<boolean>
    getCredentialByEmail(email: Email): Promise<SellerCredential | null>
}

export interface SellerQueryRepository extends QueryRepository<
    SellerDto,
    EntityId
> {}

export interface SellerRepositoryFactory extends RepositoryFactory<SellerRepository> {}
