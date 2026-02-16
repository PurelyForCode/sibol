import { Repository } from '../../core/interfaces/Repository.js'
import { Seller } from '../model/seller/Seller.js'

export interface SellerRepository extends Repository<Seller> {
    findByStoreName(storeName: string): Promise<Seller | null>
    findByStoreSlug(slug: string): Promise<Seller | null>
}
