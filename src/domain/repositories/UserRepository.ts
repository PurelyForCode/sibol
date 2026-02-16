import { Repository } from '../../core/interfaces/Repository.js'
import { User } from '../model/user/User.js'

export interface UserRepository extends Repository<User> {
    sellerExistsByEmail(email: string): Promise<boolean>
    buyerExistsByEmail(email: string): Promise<boolean>
}
