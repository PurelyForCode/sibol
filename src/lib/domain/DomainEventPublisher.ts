import { DomainEvent } from './DomainEvent.js'

export interface DomainEventPublisher {
    publish(event: DomainEvent): Promise<void>
}
