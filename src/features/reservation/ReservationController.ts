import {
    ConfirmReservationCmd,
    ConfirmReservationUsecase,
} from './ConfirmReservation.js'
import {
    FulfillReservationCmd,
    FulfillReservationUsecase,
} from './FulfillReservation.js'

export class ReservationController {
    constructor(
        private readonly fulfillReservationUsecase: FulfillReservationUsecase,
        private readonly confirmReservationUsecase: ConfirmReservationUsecase,
    ) {}
    async fulfillReservation(cmd: FulfillReservationCmd) {
        await this.fulfillReservationUsecase.execute(cmd)
    }

    async confirmReservation(cmd: ConfirmReservationCmd) {
        await this.confirmReservationUsecase.execute(cmd)
    }
}
