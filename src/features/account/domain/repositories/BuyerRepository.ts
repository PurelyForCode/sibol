import { EntityId } from '../../../../lib/EntityId.js'
import { Repository } from '../../../../lib/interfaces/Repository.js'
import { Buyer } from '../entities/Buyer.js'
import { RepositoryFactory } from '../../../../lib/interfaces/RepositoryFactory.js'

export interface BuyerRepository extends Repository<Buyer, EntityId> {}
export interface BuyerRepositoryFactory extends RepositoryFactory<BuyerRepository> {}
