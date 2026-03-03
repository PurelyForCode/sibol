import { EntityId } from '../../shared/EntityId.js'
import { Repository } from '../../shared/interfaces/Repository.js'
import { Cart } from '../aggregates/Cart.js'

export interface CartRepository extends Repository<Cart, EntityId> {}
