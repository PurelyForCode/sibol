import { EntityId } from '../../shared/EntityId.js'
import { Repository } from '../../shared/interfaces/Repository.js'
import { Sale } from '../aggregates/Sale.js'

export interface SaleRepository extends Repository<Sale, EntityId> {}
