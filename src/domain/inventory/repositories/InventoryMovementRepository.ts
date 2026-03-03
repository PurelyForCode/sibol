import { EntityId } from '../../shared/EntityId.js'
import { Repository } from '../../shared/interfaces/Repository.js'
import { InventoryMovement } from '../aggregates/InventoryMovement.js'

export interface InventoryMovementRepository extends Repository<
    InventoryMovement,
    EntityId
> {}
