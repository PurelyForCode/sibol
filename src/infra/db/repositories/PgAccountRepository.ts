import { Knex } from 'knex'
import { Account } from '../../../domain/account/aggregates/Account.js'
import { AccountRepository } from '../../../domain/account/repositories/AccountRepository.js'
import { EntityId } from '../../../lib/domain/EntityId.js'
import { UnitOfWork } from '../../../domain/shared/interfaces/UnitOfWork.js'
import { AccountRow } from '../tables/TableDefinitions.js'
import { Email } from '../../../domain/shared/value_objects/Email.js'
import { HashedPassword } from '../../../domain/shared/value_objects/HashedPassword.js'

export class PgAccountRepository implements AccountRepository {
    constructor(
        private readonly k: Knex.Transaction,
        private readonly uow: UnitOfWork,
    ) {}

    async save(entity: Account): Promise<void> {
        await this.k<AccountRow>('accounts')
            .insert({
                id: entity.id.value,
                password_hash: entity.password.value,
                banned_at: entity.bannedAt,
                created_at: entity.createdAt,
                email: entity.email.value,
                updated_at: entity.updatedAt,
            })
            .onConflict('id')
            .merge()

        this.uow.registerAggregate(entity)
    }

    async getCredentials(
        accountId: EntityId,
    ): Promise<{ email: string; password: string } | null> {
        const credentials = await this.k<AccountRow>('accounts')
            .select('password_hash', 'email')
            .where('id', accountId)
            .first()
        if (!credentials) {
            return null
        }
        return {
            email: credentials.email,
            password: credentials.password_hash,
        }
    }

    async findById(id: EntityId): Promise<Account | null> {
        const account = await this.k<AccountRow>('accounts')
            .where('id', id)
            .first()

        if (!account) {
            return null
        }
        return this.map(account)
    }

    async existsById(id: EntityId): Promise<boolean> {
        const account = await this.k<AccountRow>('accounts')
            .where('id', id)
            .first()
        return !!account
    }

    async delete(id: EntityId): Promise<void> {
        await this.k('accounts').delete().where('id', id.value)
    }

    private map(row: AccountRow): Account {
        const id = EntityId.create(row.id)
        const email = Email.create(row.email).getValue()
        const password = HashedPassword.create(row.password_hash).getValue()

        return Account.rehydrate(
            id,
            email,
            password,
            row.created_at,
            row.updated_at,
            row.banned_at,
        )
    }
}
