import { Knex } from 'knex'
import { Reservation } from '../../../domain/reservation/aggregates/Reservation.js'
import { ReservationRepository } from '../../../domain/reservation/repositories/ReservationRepository.js'
import { EntityId } from '../../../lib/domain/EntityId.js'
import { ReservationRow } from '../tables/TableDefinitions.js'
import { UnitOfMeasurement } from '../../../domain/shared/value_objects/UnitOfMeasurement.js'
import { Quantity } from '../../../domain/shared/value_objects/Quantity.js'
import { UnitOfWork } from '../../../domain/shared/interfaces/UnitOfWork.js'

export class PgReservationRepository implements ReservationRepository {
    constructor(
        private readonly k: Knex.Transaction,
        private readonly uow: UnitOfWork,
    ) {}

    async findById(id: EntityId): Promise<Reservation | null> {
        const row = await this.k<ReservationRow>('reservations')
            .where('id', id.value)
            .first()
        if (!row) {
            return null
        }
        return this.map(row)
    }
    async existsById(id: EntityId): Promise<boolean> {
        const row = await this.k<ReservationRow>('reservations')
            .select(this.k.raw(1))
            .where('id', id.value)
            .first()
        return !!row
    }
    async save(entity: Reservation): Promise<void> {
        await this.k<ReservationRow>('reservations')
            .insert({
                buyer_id: entity.buyerId.value,
                created_at: entity.createdAt,
                id: entity.id.value,
                pickup_date: entity.pickupDate,
                product_id: entity.productId.value,
                quantity: entity.quantity.value,
                sell_unit: entity.sellUnit.value,
                status: entity.status.value,
                updated_at: entity.updatedAt,
            })
            .onConflict('id')
            .merge()
        this.uow.registerAggregate(entity)
    }
    async delete(id: EntityId): Promise<void> {
        await this.k('reservations').delete().where('id', id.value)
    }

    private map(row: ReservationRow) {
        const id = EntityId.create(row.id)
        const buyerId = EntityId.create(row.buyer_id)
        const productId = EntityId.create(row.product_id)
        const sellUnit = UnitOfMeasurement.create(row.sell_unit).getValue()
        const quantity = Quantity.create(row.quantity).getValue()
        return Reservation.rehydrate(
            id,
            buyerId,
            productId,
            sellUnit,
            quantity,
            row.pickup_date,
            quantity,
            row.created_at,
            row.updated_at,
        )
    }
}
