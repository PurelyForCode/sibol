import { Knex } from 'knex'
import { EntityId } from '../../../lib/domain/EntityId.js'
import { SellerRepository } from '../../../domain/seller/repositories/SellerRepository.js'
import { Seller } from '../../../domain/seller/aggregates/Seller.js'
import { Email } from '../../../domain/shared/value_objects/Email.js'
import { StoreName } from '../../../domain/seller/value_objects/StoreName.js'
import { Rating } from '../../../domain/shared/value_objects/Rating.js'
import { TotalSales } from '../../../domain/seller/value_objects/TotalSales.js'
import { AccountRow, SellerRow } from '../tables/TableDefinitions.js'
import { MobilePhoneNumber } from '../../../domain/shared/value_objects/MobilePhoneNumber.js'
import { StoreSlug } from '../../../domain/seller/value_objects/StoreSlug.js'
import { SellerDescription } from '../../../domain/seller/value_objects/SellerDescription.js'
import { UnitOfWork } from '../../../domain/shared/interfaces/UnitOfWork.js'

export class PgSellerRepository implements SellerRepository {
    constructor(
        private readonly k: Knex.Transaction,
        private readonly uow: UnitOfWork,
    ) {}

    async existsByStoreName(storeName: StoreName): Promise<boolean> {
        const row = await this.k<SellerRow>('sellers')
            .where('store_name', storeName.value)
            .first()
        return !!row
    }
    async existsByStoreSlug(slug: StoreSlug): Promise<boolean> {
        const row = await this.k<SellerRow>('sellers')
            .where('store_slug', slug.value)
            .first()
        return !!row
    }

    async findByEmail(email: Email): Promise<Seller | null> {
        const row = await this.k<SellerRow>('sellers')
            .where('email', email.value)
            .first()
        if (!row) {
            return null
        }

        return this.map(row)
    }
    async findByStoreName(storeName: StoreName): Promise<Seller | null> {
        const row = await this.k<SellerRow>('sellers')
            .where('store_name', storeName.value)
            .first()
        if (!row) {
            return null
        }

        return this.map(row)
    }
    async findByStoreSlug(slug: StoreSlug): Promise<Seller | null> {
        const row = await this.k<SellerRow>('sellers')
            .where('store_slug', slug.value)
            .first()
        if (!row) {
            return null
        }

        return this.map(row)
    }

    async existsByEmail(email: Email): Promise<boolean> {
        const row = await this.k('users')
            .select('id')
            .where('email', email.value)
            .first()

        if (!row) {
            return false
        }

        const exists = await this.k('sellers')
            .select(1)
            .where('id', row.id)
            .first()
        return !!exists
    }

    async findById(id: EntityId): Promise<Seller | null> {
        const row = await this.k<SellerRow>('sellers')
            .where('id', id.value)
            .first()
        if (!row) {
            return null
        }
        return this.map(row)
    }

    async existsById(id: EntityId): Promise<boolean> {
        const row = await this.k('sellers')
            .select(1)
            .where('id', id.value)
            .first()
        return !!row
    }

    async save(entity: Seller): Promise<void> {
        await this.k<SellerRow>('sellers')
            .insert({
                id: entity.id.value,
                rating: entity.rating ? entity.rating.value : undefined,
                store_name: entity.storeName.value,
                total_sales: entity.totalSales.value,
                created_at: entity.createdAt,
                description: entity.description?.value,
                is_active: entity.isActive,
                is_verified: entity.isVerified,
                store_slug: entity.storeSlug.value,
                support_email: entity.supportEmail?.value,
                support_phone: entity.supportPhone?.value,
                updated_at: entity.updatedAt,
            })

            .onConflict('id')
            .merge()
        this.uow.registerAggregate(entity)
    }

    async delete(id: EntityId): Promise<void> {
        await this.k<AccountRow>('accounts').delete().where('id', id.value)
    }

    private map(row: SellerRow): Seller {
        const id = EntityId.create(row.id)
        const supportEmail = row.support_email
            ? Email.create(row.support_email).getValue()
            : null
        const supportPhone = row.support_phone
            ? MobilePhoneNumber.create(row.support_phone).getValue()
            : null
        const rating = row.rating ? Rating.create(row.rating) : null
        const storeName = StoreName.create(row.store_name).getValue()
        const description = row.description
            ? SellerDescription.create(row.description).getValue()
            : null
        const storeSlug = StoreSlug.create(row.store_slug).getValue()
        const totalSales = TotalSales.create(row.total_sales).getValue()

        return Seller.rehydrate(
            id,
            storeName,
            storeSlug,
            description,
            rating,
            totalSales,
            row.is_verified,
            row.is_active,
            supportEmail,
            supportPhone,
            row.created_at,
            row.updated_at,
        )
    }
}
