import { Buyer } from '../aggregates/Buyer.js'

export class BuyerMustBeUnbannedToPerformActionPolicy {
    static enforce(buyer: Buyer): boolean {
        return buyer.isActive
    }
}
