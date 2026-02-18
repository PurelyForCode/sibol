import { EntityId } from '../../../lib/domain/EntityId.js'
import { Buyer } from '../aggregates/Buyer.js'
import { Email } from '../../shared/value_objects/Email.js'
import { Username } from '../../shared/value_objects/Username.js'

export class BuyerService {
    create(id: EntityId, email: Email, username: Username) {
        // const totalOrders = TotalOrders.create(0)
        // if (!totalOrders.isSuccess) {
        //     throw new Error()
        // }

        return Buyer.rehydrate(id, email, username, false, totalOrders.value)
    }
}
