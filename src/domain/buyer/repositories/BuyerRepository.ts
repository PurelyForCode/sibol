import { EntityId } from '../../../lib/domain/EntityId.js'
import { Repository } from '../../shared/interfaces/Repository.js'
import { Email } from '../../shared/value_objects/Email.js'
import { Username } from '../../shared/value_objects/Username.js'
import { Buyer } from '../aggregates/Buyer.js'
import { BuyerUniquenessChecker } from '../interfaces/BuyerUniquenessChecker.js'

export interface BuyerRepository
    extends Repository<Buyer, EntityId>, BuyerUniquenessChecker {
    findByEmail(email: Email): Promise<Buyer | null>
    findByUsername(username: Username): Promise<Buyer | null>
}
