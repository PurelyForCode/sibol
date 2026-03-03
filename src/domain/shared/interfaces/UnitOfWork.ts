import { AggregateRoot } from '../AggregateRoot.js'
import { DomainEvent } from '../DomainEvent.js'
import { DomainEventPublisher } from './DomainEventPublisher.js'
import { AccountRepository } from '../../account/repositories/AccountRepository.js'
import { BuyerRepository } from '../../buyer/repositories/BuyerRepository.js'
import { CartRepository } from '../../cart/repositories/CartRepository.js'
import { InventoryMovementRepository } from '../../inventory/repositories/InventoryMovementRepository.js'
import { ProductRepository } from '../../product/repositories/ProductRepository.js'
import { ReservationRepository } from '../../reservation/repositories/ReservationRepository.js'
import { SellerRepository } from '../../seller/repositories/SellerRepository.js'
import { SaleRepository } from '../../sale/repositories/SaleRepository.js'
import { SellUnitQueryRepository } from '../../product/repositories/SellUnitQueryRepository.js'

export interface UnitOfWork {
    registerAggregate(aggregate: AggregateRoot): void
    pullDomainEvents(): DomainEvent[]
    publishEvents(): Promise<void>
    getSellerRepo(): SellerRepository
    getProductRepo(): ProductRepository
    getBuyerRepo(): BuyerRepository
    getAccountRepo(): AccountRepository
    getOutboxRepo(): DomainEventPublisher
    getCartRepo(): CartRepository
    getReservationRepo(): ReservationRepository
    getInventoryMovementRepo(): InventoryMovementRepository
    getSaleRepo(): SaleRepository
}
