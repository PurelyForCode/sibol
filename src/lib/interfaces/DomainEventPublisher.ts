import { DomainEvent } from '../domain/DomainEvent.js'

export interface DomainEventPublisher {
    publish(event: DomainEvent): Promise<void>
}
