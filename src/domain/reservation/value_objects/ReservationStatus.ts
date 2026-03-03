import { SingleValueObject } from '../../shared/SingleValueObject.js'
import { Result } from '../../../types/utils/Result.js'

export enum ReservationStatusValues {
    Reserved = 'reserved',
    Completed = 'completed',
    Unconfirmed = 'uncomfirmed',
    Cancelled = 'cancelled',
    Late = 'late',
}

export class ReservationStatus extends SingleValueObject<string> {
    constructor(value: ReservationStatusValues) {
        super(value)
    }

    static create(value: ReservationStatusValues): Result<ReservationStatus> {
        return Result.ok(new ReservationStatus(value))
    }

    static reserved() {
        return new ReservationStatus(ReservationStatusValues.Reserved)
    }

    static cancelled() {
        return new ReservationStatus(ReservationStatusValues.Cancelled)
    }

    static late() {
        return new ReservationStatus(ReservationStatusValues.Late)
    }

    static completed() {
        return new ReservationStatus(ReservationStatusValues.Completed)
    }
}
