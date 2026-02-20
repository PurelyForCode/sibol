import { Buyer } from '../aggregates/Buyer.js'

export class BuyerMustBeVerifiedToPerformActionPolicy {
    static enforce(buyer: Buyer): boolean {
        return buyer.isVerified
    }
}
