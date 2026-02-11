import { EntityId } from '../../../../lib/EntityId.js'
import { Buyer } from '../entities/buyer/Buyer.js'
import { TotalOrders } from '../entities/buyer/TotalOrders.js'
import { Email } from '../entities/Email.js'
import { Username } from '../entities/Username.js'

export class BuyerService {
    create(id: EntityId, email: Email, username: Username) {
        const totalOrders = TotalOrders.create(0)
        if (!totalOrders.isSuccess) {
            throw new Error()
        }

        return Buyer.create(id, email, username, false, totalOrders.value)
    }
}
