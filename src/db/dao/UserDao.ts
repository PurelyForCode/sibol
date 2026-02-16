import { Knex } from 'knex'
import { UserRow } from '../tables/RowDefinitions.js'

export class UserDao {
    constructor(private readonly knex: Knex | Knex.Transaction) {}

    async findById(id: string): Promise<UserRow | null> {
        const row = await this.knex<UserRow>('users').where('id', id).first()

        if (!row) {
            return null
        }

        return row
    }

    async findByEmail(email: string): Promise<UserRow | null> {
        const row = await this.knex<UserRow>('users')
            .where('email', email)
            .first()

        if (!row) {
            return null
        }

        return row
    }
}
