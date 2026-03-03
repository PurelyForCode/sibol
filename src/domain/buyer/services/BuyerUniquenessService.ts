import { BuyerEmailAlreadyTakenException } from '../../../exceptions/buyer/BuyerEmailAlreadyTakenException.js'
import { BuyerUsernameAlreadyExistsException } from '../../../exceptions/buyer/BuyerUsernameAlreadyExistsException.js'
import { Email } from '../../shared/value_objects/Email.js'
import { Username } from '../../shared/value_objects/Username.js'
import { BuyerUniquenessChecker } from '../interfaces/BuyerUniquenessChecker.js'

export class BuyerUniquenessService {
    constructor(private readonly checker: BuyerUniquenessChecker) {}

    async assertIsUsernameUnique(username: Username) {
        if (!(await this.checker.isUsernameUnique(username))) {
            throw new BuyerUsernameAlreadyExistsException(username.value)
        }
    }

    async assertIsEmailUniqueWithinBuyers(email: Email) {
        if (!(await this.checker.isEmailUniqueWithinBuyers(email))) {
            throw new BuyerEmailAlreadyTakenException(email.value)
        }
    }
}
