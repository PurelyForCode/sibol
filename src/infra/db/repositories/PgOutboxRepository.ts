import { Knex } from 'knex'
import { OutboxEvent } from '../../../domain/outbox/OutboxEvent.js'
import { EntityId } from '../../../domain/shared/EntityId.js'
import { OutboxRepository } from '../../../domain/shared/interfaces/OutboxRepository.js'

export class PgOutboxRepository implements OutboxRepository {
    constructor(private readonly knex: Knex.Transaction) {}

    findById(id: EntityId): Promise<OutboxEvent | null> {
        throw new Error('Method not implemented.')
    }
    existsById(id: EntityId): Promise<boolean> {
        throw new Error('Method not implemented.')
    }
    save(entity: OutboxEvent): Promise<void> {
        this.knex().insert().onConflict().merge()
    }
    delete(id: EntityId): Promise<void> {
        throw new Error('Method not implemented.')
    }
}
