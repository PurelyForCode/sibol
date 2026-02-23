import { Email } from '../../shared/value_objects/Email.js'
import { Username } from '../../shared/value_objects/Username.js'

export interface BuyerUniquenessChecker {
    isUsernameUnique(username: Username): Promise<boolean>
    isEmailUniqueWithinBuyers(email: Email): Promise<boolean>
}
