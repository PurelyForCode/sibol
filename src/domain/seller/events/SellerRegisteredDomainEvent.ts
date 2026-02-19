import { DomainEvent } from '../../../lib/domain/DomainEvent.js'

export class SellerRegisteredDomainEvent extends DomainEvent {
    constructor(public readonly sellerId: string) {
        super(new Date(), 'SELLER_REGISTERED')
    }
}
