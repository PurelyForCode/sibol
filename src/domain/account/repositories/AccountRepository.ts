import { EntityId } from '../../../lib/domain/EntityId.js'
import { Repository } from '../../shared/interfaces/Repository.js'
import { Account } from '../aggregates/Account.js'

export interface AccountRepository extends Repository<Account, EntityId> {
    getCredentials(
        accountId: EntityId,
    ): Promise<{ email: string; password: string } | null>
}
