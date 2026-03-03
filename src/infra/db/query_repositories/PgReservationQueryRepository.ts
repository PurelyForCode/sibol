import { Knex } from 'knex'
import { EntityId } from '../../../domain/shared/EntityId.js'
import { ReservationRow } from '../tables/TableDefinitions.js'
import { ReservationNotFoundException } from '../../../exceptions/reservation/ReservationNotFoundException.js'
import { ReservationDto } from '../../../features/dto/ReservationDto.js'

export class PgReservationQueryRepository {
    constructor(private readonly k: Knex | Knex.Transaction) {}

    async findAllReservationsByBuyerId(
        id: EntityId,
    ): Promise<ReservationDto[] | null> {
        const reservations = await this.k<ReservationRow>('reservations')
            .select('*')
            .where('buyer_id', id.value)

        if (!reservations) {
            return null
        }

        return this.map(reservations)
    }

    private map(rows: ReservationRow[]): ReservationDto[] {
        const reservations: ReservationDto[] = []
        for (const row of rows) {
            reservations.push({
                id: row.id,
                buyerId: row.buyer_id,
                createdAt: row.created_at,
                pickupDate: row.pickup_date,
                status: row.status,
                updatedAt: row.updated_at,
            } as ReservationDto)
        }
        return reservations
    }
}
