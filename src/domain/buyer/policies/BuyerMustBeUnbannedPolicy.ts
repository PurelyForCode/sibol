import { Buyer } from '../aggregates/Buyer.js'

export class BuyerMustBeUnbannedPolicy {
    static enforce(buyer: Buyer): boolean {
        return buyer.isBanned
    }
}
