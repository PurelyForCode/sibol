import { EntityId } from '../../../../lib/EntityId.js'
import { Rating } from '../../../shared/value_objects/Rating.js'
import { Email } from '../entities/Email.js'
import { Seller } from '../entities/seller/Seller.js'
import { StoreName } from '../entities/seller/StoreName.js'
import { TotalSales } from '../entities/seller/TotalSales.js'

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
