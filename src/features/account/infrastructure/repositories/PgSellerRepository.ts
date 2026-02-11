import { Knex } from 'knex'
import { EntityId } from '../../../../lib/EntityId.js'SellerRepo
import {
    SellerRepository,
    SellerRepositoryFactory,
} from '../../domain/repositories/SellerRepository.js'
import { HashedPassword } from '../../domain/entities/HashedPassword.js'
import { Seller } from '../../domain/entities/seller/Seller.js'
import { Email } from '../../domain/entities/Email.js'
import { SellerRow } from '../../../../lib/database_tables/SellerRow.js'
import { StoreName } from '../../domain/entities/seller/StoreName.js'
import { Rating } from '../../../shared/value_objects/Rating.js'
import { TotalSales } from '../../domain/entities/seller/TotalSales.js'
import { UserRow } from '../../../../lib/database_tables/UserRow.js'
import { UserCredential } from '../../domain/entities/UserCredential.js'
import { SellerUserRow } from '../../../../lib/database_tables/SellerUserRow.js'

export class PgSellerRepositoryFactory implements SellerRepositoryFactory {
    create(props: Knex.Transaction): SellerRepository {
        return new PgSellerRepository(props)
    }
}

export class PgSellerRepository implements SellerRepository {
    constructor(private readonly k: Knex.Transaction) {}

    async existsByEmail(email: Email): Promise<boolean> {
        const row = await this.k('users').select('id')
            .where('email', email.value)
            .first()

        if (!row) {
            return false
        }

        const exists = await this.k('sellers').select(1).where('id', row.id).first()
        return !!exists
    }

    async findById(id: EntityId): Promise<Seller | null> {
        const row = await this.k<SellerUserRow>('users as u')
            .select(
                'u.id',
                'u.email',
                'u.updated_at',
                'u.created_at',
                's.store_name',
                's.rating',
                's.total_sales',
            )
            .leftJoin('sellers as s', 'u.id', 's.id')
            .where('id', id.value)
            .first()
        if (!row) {
            return null
        }
        return this.map(row)
    }

    async existsById(id: EntityId): Promise<boolean> {
        const row = await this.k('sellers').select(1).where('id', id.value).first()
        return !!row
    }

    async save(entity: Seller): Promise<void> {
        await this.k<SellerRow>('sellers')
            .insert({
                id: entity.id.value,
                rating: entity.rating ? entity.rating.value : undefined,
                store_name: entity.storeName.value,
                total_sales: entity.totalSales.value,
            })
            .onConflict('id')
            .merge({
                rating: entity.rating ? entity.rating.value : undefined,
                store_name: entity.storeName.value,
                total_sales: entity.totalSales.value,
            })
    }

    async changeCredentials(credential: UserCredential): Promise<void> {
        await this.k<UserRow>('users')
            .update({
                password_hash: credential.passwordHash.value,
                email: credential.email.value,
            })
            .where('id', credential.id)
    }

    async register(entity: { seller: Seller; passwordHash: HashedPassword }) {
        await this.k<UserRow>('users').insert({
            created_at: entity.seller.createdAt,
            email: entity.seller.email.value,
            id: entity.seller.id.value,
            password_hash: entity.passwordHash.value,
            updated_at: entity.seller.updatedAt,
        })
        await this.k<SellerRow>('sellers').insert({
            id: entity.seller.id.value,
            rating: entity.seller.rating
                ? entity.seller.rating.value
                : undefined,
            store_name: entity.seller.storeName.value,
            total_sales: entity.seller.totalSales.value,
        })
    }

    async getCredentialByEmail(email: Email): Promise<UserCredential | null> {
        const row = await this.k<UserRow>('users as u')
            .select('u.id', 'u.email', 'u.password_hash')
            .where('u.email', email.value)
            .whereExists(function () {
                this.select('*').from('sellers as s').whereRaw('s.id = u.id')
            })
            .first()

        if (!row) return null

        return UserCredential.create(
            EntityId.create(row.id),
            Email.create(row.email).value,
            HashedPassword.create(row.password_hash),
        )
    }

    async delete(id: EntityId): Promise<void> {
        await this.k<UserRow>('users').delete().where('id', id.value)
    }

    private map(row: SellerUserRow): Seller {
        const id = EntityId.create(row.id)
        const email = Email.create(row.email)
        const rating = row.rating ? Rating.create(row.rating) : null
        const storeName = StoreName.create(row.store_name)
        const totalSales = TotalSales.create(row.total_sales)

        return Seller.create(
            id,
            email.value,
            storeName.value,
            rating,
            totalSales.value,
            row.created_at,
            row.updated_at,
            row.banned_at,
        )
    }
}
