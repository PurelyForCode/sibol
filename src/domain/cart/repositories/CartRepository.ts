import { EntityId, Id } from '../../../lib/domain/EntityId.js'
import { Repository } from '../../shared/interfaces/Repository.js'
import { Cart } from '../aggregates/Cart.js'

export interface CartRepository extends Repository<Cart, Id> {
    findByBuyerId(buyerId: EntityId): Promise<Cart | null>
}
