import { Knex } from 'knex'
import { UnitOfWork } from '../interfaces/UnitOfWork.js'
import { PgSellerRepository } from '../../db/repositories/PgSellerRepository.js'
import { PgProductRepository } from '../../db/repositories/PgProductRepository.js'
import { PgUserRepository } from '../../db/repositories/PgUserRepository.js'
import { PgBuyerRepository } from '../../db/repositories/PgBuyerRepository.js'
import { BuyerRepository } from '../../domain/repositories/BuyerRepository.js'
import { UserRepository } from '../../domain/repositories/UserRepository.js'
import { ProductRepository } from '../../domain/repositories/ProductRepository.js'
import { SellerRepository } from '../../domain/repositories/SellerRepository.js'

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
