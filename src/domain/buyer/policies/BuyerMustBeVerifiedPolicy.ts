import { Buyer } from '../aggregates/Buyer.js'

export class BuyerMustBeVerifiedPolicy {
    static enforce(buyer: Buyer): boolean {
        return buyer.isVerified
    }
}
