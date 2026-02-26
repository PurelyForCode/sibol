import { AppException } from '../AppException.js'

export class PickupDateIsInPastException extends AppException {
    constructor() {
        super('Can not create new pickup date that is in the past')
    }
}
