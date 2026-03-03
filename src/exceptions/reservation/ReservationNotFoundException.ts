import { AppException } from '../AppException.js'

export class ReservationNotFoundException extends AppException {
    constructor(reservationId: string) {
        super(`Reservation with id '${reservationId} not found'`)
    }
}
