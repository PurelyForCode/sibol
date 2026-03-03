import { Result } from '../../../types/utils/Result.js'
import { SingleValueObject } from '../../shared/SingleValueObject.js'

export enum ReservationStatusValues {
    Active = 'active',
    Cancelled = 'cancelled',
    FulfilledBySeller = 'fulfilled_by_seller',
    ConfirmedByBuyer = 'confirmed_by_buyer',
}

export class ReservationStatus extends SingleValueObject<ReservationStatusValues> {
    private constructor(value: ReservationStatusValues) {
        super(value)
    }

    static create(value: ReservationStatusValues): Result<ReservationStatus> {
        return Result.ok(new ReservationStatus(value))
    }

    static active() {
        return new ReservationStatus(ReservationStatusValues.Active)
    }

    static cancelled() {
        return new ReservationStatus(ReservationStatusValues.Cancelled)
    }

    static fulfilledBySeller() {
        return new ReservationStatus(ReservationStatusValues.FulfilledBySeller)
    }

    static confirmedByBuyer() {
        return new ReservationStatus(ReservationStatusValues.ConfirmedByBuyer)
    }
}
