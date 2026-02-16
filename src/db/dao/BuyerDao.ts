import { Knex } from 'knex'
import { BuyerRow } from '../tables/RowDefinitions.js'

export class BuyerDao {
    constructor(private readonly knex: Knex | Knex.Transaction) {}

    async findById(id: string): Promise<BuyerRow | null> {
        const row = await this.knex<BuyerRow>('buyers').where('id', id).first()

        if (!row) {
            return null
        }

        return row
    }
}
