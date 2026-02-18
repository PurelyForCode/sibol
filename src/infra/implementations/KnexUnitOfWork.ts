import { Knex } from 'knex'
import { UnitOfWork } from '../../domain/shared/interfaces/UnitOfWork.js'
import { SellerRepository } from '../../domain/seller/repositories/SellerRepository.js'
import { PgSellerRepository } from '../db/repositories/PgSellerRepository.js'
import { ProductRepository } from '../../domain/product/repositories/ProductRepository.js'
import { PgProductRepository } from '../db/repositories/PgProductRepository.js'
import { BuyerRepository } from '../../domain/buyer/repositories/BuyerRepository.js'
import { PgBuyerRepository } from '../db/repositories/PgBuyerQueryRepository.js'

export class KnexUnitOfWork implements UnitOfWork {
    constructor(private readonly trx: Knex.Transaction) {}

    getSellerRepo(): SellerRepository {
        return new PgSellerRepository(this.trx)
    }

    getProductRepo(): ProductRepository {
        return new PgProductRepository(this.trx)
    }

    getBuyerRepo(): BuyerRepository {
        return new PgBuyerRepository(this.trx)
    }
}
