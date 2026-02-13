import { Knex } from 'knex'
import { BuyerRepository } from '../../repositories/BuyerRepository.js'
import { ProductRepository } from '../../repositories/ProductRepository.js'
import { SellerRepository } from '../../repositories/SellerRepository.js'
import { UserRepository } from '../../repositories/UserRepository.js'
import { UnitOfWork } from '../interfaces/UnitOfWork.js'
import { PgSellerRepository } from '../../db/repositories/SellerRepository.js'
import { PgProductRepository } from '../../db/repositories/ProductRepository.js'
import { PgUserRepository } from '../../db/repositories/UserRepository.js'
import { PgBuyerRepository } from '../../db/repositories/BuyerRepository.js'

export class KnexUnitOfWork implements UnitOfWork {
    constructor(private readonly trx: Knex.Transaction) {}

    getSellerRepo(): SellerRepository {
        return new PgSellerRepository(this.trx)
    }

    getProductRepo(): ProductRepository {
        return new PgProductRepository(this.trx)
    }

    getUserRepo(): UserRepository {
        return new PgUserRepository(this.trx)
    }

    getBuyerRepo(): BuyerRepository {
        return new PgBuyerRepository(this.trx)
    }
}
