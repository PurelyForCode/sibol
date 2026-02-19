import { EntityId } from '../../../lib/domain/EntityId.js'
import { Account } from '../aggregates/Account.js'
import { Repository } from '../../shared/interfaces/Repository.js'

export interface AccountRepository extends Repository<Account, EntityId> {
    getCredentials(
        accountId: EntityId,
    ): Promise<{ email: string; password: string } | null>
}
