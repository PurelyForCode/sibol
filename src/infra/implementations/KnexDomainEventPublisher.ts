import { Knex } from 'knex'
import { DomainEvent } from '../../lib/domain/DomainEvent.js'
import { OutboxEvent } from '../../domain/outbox/OutboxEvent.js'
import { DomainEventPublisher } from '../../lib/domain/DomainEventPublisher.js'
import { IdGenerator } from '../../domain/shared/interfaces/IdGenerator.js'
import { OutboxRow } from '../db/tables/TableDefinitions.js'

export class KnexDomainEventPublisher implements DomainEventPublisher {
    constructor(
        private readonly knex: Knex.Transaction,
        private readonly idGenerator: IdGenerator,
    ) {}

    async publish(event: DomainEvent): Promise<void> {
        const outbox = new OutboxEvent(
            this.idGenerator.generate(),
            event.eventType,
            event,
            event.occurredAt,
            null,
        )

        await this.knex<OutboxRow>('outbox').insert({
            id: outbox.id.value,
            occurred_at: outbox.occurredAt,
            payload: outbox.payload,
            processed_at: outbox.processedAt,
            type: outbox.type,
        })
    }
}
