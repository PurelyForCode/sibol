import { DomainEvent } from '../../shared/DomainEvent.js'

export class BuyerRegisteredDomainEvent extends DomainEvent {
    constructor(public readonly buyerId: string) {
        super(new Date(), 'BUYER_REGISTERED')
    }
}
