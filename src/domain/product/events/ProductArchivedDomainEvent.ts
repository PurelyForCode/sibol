import { DomainEvent } from '../../../lib/domain/DomainEvent.js'

export class ProductArchivedDomainEvent extends DomainEvent {
    constructor(public readonly productId: string) {
        super(new Date(), 'PRODUCT_ARCHIVED')
    }
}
