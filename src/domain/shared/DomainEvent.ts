export abstract class DomainEvent {
    constructor(
        public readonly occurredAt: Date,
        public readonly eventType: string,
    ) {}
}
