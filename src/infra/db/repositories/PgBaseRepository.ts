import cloneDeep from 'lodash/cloneDeep.js'
import { AggregateRoot } from '../../../lib/domain/AggregateRoot.js'
import { EntityId, Id } from '../../../lib/domain/EntityId.js'
import { Entity } from '../../../lib/domain/Entity.js'
import { InternalServerError } from '../../../exceptions/shared/InternalServerError.js'

export abstract class PgBaseRepository<T extends AggregateRoot> {
    private snapshots: Map<Id, T> = new Map()

    snapshot(aggregate: T) {
        const snapshot = cloneDeep(aggregate)
        this.snapshots.set(snapshot.id.value, snapshot)
    }

    getSnapshot(id: EntityId): T | null {
        const snapshot = this.snapshots.get(id.value)
        if (!snapshot) {
            return null
        }
        return snapshot
    }

    getDeletedIds(
        snapshotChildEntities: Map<Id, Entity>,
        childEntities: Map<Id, Entity>,
    ): Id[] {
        const ids: Id[] = []
        for (const snapshotId of snapshotChildEntities.keys())
            if (!childEntities.has(snapshotId)) {
                ids.push(snapshotId)
            }
        return ids
    }
}
