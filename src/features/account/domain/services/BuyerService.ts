import { EntityId } from '../../../../lib/EntityId.js'
import { Buyer } from '../entities/buyer/Buyer.js'

export class BuyerService {
    create(id: EntityId) {
        Buyer.create(id, email, password, role)
    }
}
