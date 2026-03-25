import { Email } from '../../../shared/value_objects/Email.js'

export interface SellerUniquenessChecker {
    isEmailUniqueWithinSellers(email: Email): Promise<boolean>
}
