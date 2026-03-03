import { EntityId } from '../../shared/EntityId.js'
import { Repository } from '../../shared/interfaces/Repository.js'
import { Reservation } from '../aggregates/Reservation.js'

export interface ReservationRepository extends Repository<
    Reservation,
    EntityId
> {}
