import { Knex } from 'knex'
import { OutboxRepository } from '../../domain/outbox/OutboxRepository.js'
import { DomainEvent } from '../../lib/domain/DomainEvent.js'
import { OutboxRow } from '../db/tables/TableDefinitions.js'

export class PgOutboxRepository implements OutboxRepository {
    constructor(private readonly knex: Knex.Transaction) {}

    async insert(event: DomainEvent): Promise<void> {
        this.knex<OutboxRow>('outbox')
    }
}
