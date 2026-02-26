import { DomainEvent } from './DomainEvent.js'
import { Entity } from './Entity.js'
import { EntityId } from './EntityId.js'

export type StateChange = {
    type: 'modified' | 'deleted' | 'new'
    entity: Entity
}

export abstract class AggregateRoot extends Entity {
    private _events: DomainEvent[] = []
    addEvent(event: DomainEvent) {
        this._events.push(event)
    }

    pullEvents(): DomainEvent[] {
        const events = [...this._events]
        this._events = []
        return events
    }
}
