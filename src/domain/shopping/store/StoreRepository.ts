import { EntityId } from '../../shared/EntityId'
import { Repository } from '../../shared/interfaces/Repository'
import { Store } from './Store'
import { StoreUniquenessChecker } from './StoreUniquenessChecker'

export interface StoreRepository
    extends StoreUniquenessChecker, Repository<Store, EntityId> {}
