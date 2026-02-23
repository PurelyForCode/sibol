import { Knex } from 'knex'
import { UnitOfWork } from '../../domain/shared/interfaces/UnitOfWork.js'
import { SellerRepository } from '../../domain/seller/repositories/SellerRepository.js'
import { PgSellerRepository } from '../db/repositories/PgSellerRepository.js'
import { ProductRepository } from '../../domain/product/repositories/ProductRepository.js'
import { PgProductRepository } from '../db/repositories/PgProductRepository.js'
import { BuyerRepository } from '../../domain/buyer/repositories/BuyerRepository.js'
import { AccountRepository } from '../../domain/account/repositories/AccountRepository.js'
import { AggregateRoot } from '../../lib/domain/AggregateRoot.js'
import { DomainEvent } from '../../lib/domain/DomainEvent.js'
import { PgAccountRepository } from '../db/repositories/PgAccountRepository.js'
import { DomainEventPublisher } from '../../lib/interfaces/DomainEventPublisher.js'
import { KnexDomainEventPublisher } from './KnexDomainEventPublisher.js'
import { IdGenerator } from '../../domain/shared/interfaces/IdGenerator.js'
import { PgBuyerRepository } from '../db/repositories/PgBuyerRepository.js'
import { CartRepository } from '../../domain/cart/repositories/CartRepository.js'
import { PgCartRepository } from '../db/repositories/PgCartRepository.js'

export class KnexUnitOfWork implements UnitOfWork {
    private aggregates: AggregateRoot[] = []

    constructor(
        private readonly trx: Knex.Transaction,
        private readonly idGenerator: IdGenerator,
    ) {}

    async publishEvents() {
        const events = this.pullDomainEvents()
        const outboxRepo = this.getOutboxRepo()
        for (const event of events) {
            await outboxRepo.publish(event)
        }
    }

    registerAggregate(aggregate: AggregateRoot): void {
        this.aggregates.push(aggregate)
    }

    getOutboxRepo(): DomainEventPublisher {
        return new KnexDomainEventPublisher(this.trx, this.idGenerator)
    }

    pullDomainEvents(): DomainEvent[] {
        return this.aggregates.flatMap(a => a.pullEvents())
    }

    getCartRepo(): CartRepository {
        return new PgCartRepository(this.trx)
    }

    getAccountRepo(): AccountRepository {
        return new PgAccountRepository(this.trx, this)
    }

    getSellerRepo(): SellerRepository {
        return new PgSellerRepository(this.trx, this)
    }

    getProductRepo(): ProductRepository {
        return new PgProductRepository(this.trx, this)
    }

    getBuyerRepo(): BuyerRepository {
        return new PgBuyerRepository(this.trx, this)
    }
}
