import { EntityId } from '../../shared/EntityId.js'

// would a seller need to have its address in order to be consistent?
export class SellerAddress {
    constructor(
        private id: EntityId,
        private sellerId: EntityId,
    ) {}
}
