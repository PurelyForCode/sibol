import { Seller } from '../model/seller/Seller.js'
import { Repository } from '../core/interfaces/Repository.js'

export interface SellerRepository extends Repository<Seller> {
    findByEmail(email: string): Promise<Seller>
}
