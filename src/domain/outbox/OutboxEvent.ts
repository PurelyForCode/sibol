import { EntityId } from '../../lib/domain/EntityId.js'

export class OutboxEvent {
    constructor(
        public readonly id: EntityId,
        public readonly type: string,
        public readonly payload: unknown,
        public readonly occurredAt: Date,
        public readonly processedAt: Date | null,
    ) {}
}
