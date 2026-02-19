import { AggregateRoot } from '../../../lib/domain/AggregateRoot.js'
import { DomainEvent } from '../../../lib/domain/DomainEvent.js'
import { DomainEventPublisher } from '../../../lib/domain/DomainEventPublisher.js'
import { AccountRepository } from '../../account/repositories/AccountRepository.js'
import { BuyerRepository } from '../../buyer/repositories/BuyerRepository.js'
import { ProductRepository } from '../../product/repositories/ProductRepository.js'
import { SellerRepository } from '../../seller/repositories/SellerRepository.js'

export interface UnitOfWork {
    registerAggregate(aggregate: AggregateRoot): void
    pullDomainEvents(): DomainEvent[]
    publishEvents(): Promise<void>
    getSellerRepo(): SellerRepository
    getProductRepo(): ProductRepository
    getBuyerRepo(): BuyerRepository
    getAccountRepo(): AccountRepository
    getOutboxRepo(): DomainEventPublisher
}
