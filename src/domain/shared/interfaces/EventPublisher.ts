import { EntityId } from '../../../lib/domain/EntityId.js'
import { OutboxEvent } from '../../outbox/OutboxEvent.js'
import { Repository } from './Repository.js'

export interface OutboxRepository extends Repository<OutboxEvent, EntityId> {}
