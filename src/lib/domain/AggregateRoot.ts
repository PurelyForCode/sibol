import { DomainEvent } from './DomainEvent.js'

export abstract class AggregateRoot {
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
