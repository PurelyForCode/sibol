import { BuyerRepository } from '../../domain/repositories/BuyerRepository.js'
import { ProductRepository } from '../../domain/repositories/ProductRepository.js'
import { SellerRepository } from '../../domain/repositories/SellerRepository.js'
import { UserRepository } from '../../domain/repositories/UserRepository.js'

export interface UnitOfWork {
    getSellerRepo(): SellerRepository
    getProductRepo(): ProductRepository
    getUserRepo(): UserRepository
    getBuyerRepo(): BuyerRepository
}
