import { AccountRepository } from '../../account/repositories/AccountRepository.js'
import { BuyerRepository } from '../../buyer/repositories/BuyerRepository.js'
import { ProductRepository } from '../../product/repositories/ProductRepository.js'
import { SellerRepository } from '../../seller/repositories/SellerRepository.js'

export interface UnitOfWork {
    getSellerRepo(): SellerRepository
    getProductRepo(): ProductRepository
    getBuyerRepo(): BuyerRepository
    getAccountRepo(): AccountRepository
}
