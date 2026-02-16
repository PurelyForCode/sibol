import { Repository } from '../../core/interfaces/Repository.js'
import { Product } from '../model/product/Product.js'

export interface ProductRepository extends Repository<Product> {
    productExistsByNameAndSellerId(
        name: string,
        sellerId: string,
    ): Promise<boolean>
}
