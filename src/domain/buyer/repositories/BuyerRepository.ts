import { EntityId } from '../../../lib/domain/EntityId.js'
import { Repository } from '../../shared/interfaces/Repository.js'
import { Email } from '../../shared/value_objects/Email.js'
import { Username } from '../../shared/value_objects/Username.js'
import { Buyer } from '../aggregates/Buyer.js'

export interface BuyerRepository extends Repository<Buyer, EntityId> {
    findByEmail(email: Email): Promise<Buyer | null>
    findByUsername(username: Username): Promise<Buyer | null>
    existsByUsername(username: Username): Promise<boolean>
    existsByEmail(email: Email): Promise<boolean>
}
