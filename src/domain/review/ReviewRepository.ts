import { EntityId } from '../shared/EntityId.js'
import { Repository } from '../shared/interfaces/Repository.js'
import { Review } from './Review.js'

export interface ReviewRepository extends Repository<Review, EntityId> {
    hasBuyerReviewedTheirSale(
        saleId: EntityId,
        buyerId: EntityId,
    ): Promise<boolean>
}
