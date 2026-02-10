import { EntityId } from '../../../../lib/EntityId.js'
import { Repository } from '../../../../lib/interfaces/Repository.js'
import { Seller } from '../entities/seller/Seller.js'
import { RepositoryFactory } from '../../../../lib/interfaces/RepositoryFactory.js'

export interface SellerRepository extends Repository<Seller, EntityId> {}
export interface SellerRepositoryFactory extends RepositoryFactory<SellerRepository> {}
