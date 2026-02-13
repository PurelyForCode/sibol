import { BuyerRepository } from '../../repositories/BuyerRepository.js'
import { ProductRepository } from '../../repositories/ProductRepository.js'
import { SellerRepository } from '../../repositories/SellerRepository.js'
import { UserRepository } from '../../repositories/UserRepository.js'

export interface UnitOfWork {
    getSellerRepo(): SellerRepository
    getProductRepo(): ProductRepository
    getUserRepo(): UserRepository
    getBuyerRepo(): BuyerRepository
}
