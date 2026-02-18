import { EntityId } from '../../../lib/domain/EntityId.js'
import { Rating } from '../../shared/value_objects/Rating.js'
import { Email } from '../../shared/value_objects/Email.js'
import { Seller } from '../aggregates/Seller.js'
import { StoreName } from '../value_objects/StoreName.js'
import { TotalSales } from '../value_objects/TotalSales.js'

type CreateSellerInput = {
    id: EntityId
    email: Email
    storeName: StoreName
    rating: Rating | null
    totalSales: TotalSales
}

export class SellerService {
    create(input: CreateSellerInput) {
        return Seller.create(
            input.id,
            input.email,
            input.storeName,
            input.rating,
            input.totalSales,
        )
    }
}
