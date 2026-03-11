import { Knex } from 'knex'
import { ProductDetailsDto } from '../../http/query/dto/ProductDetailsDto.js'
import { Pagination } from '../../../types/query/Pagination.js'
import {
    ProductImageRow,
    ProductRow,
    SellUnitRow,
} from '../tables/TableDefinitions.js'
import { ProductCatalogueItemDto } from '../../http/query/dto/ProductCatalogueItemDto.js'

export class PgProductQueryRepository {
    constructor(private readonly k: Knex | Knex.Transaction) {}
    async findActiveProductDetailById(
        id: string,
    ): Promise<ProductDetailsDto | null> {
        const data = (await this.k('products as p')
            .leftJoin('product_inventory as inv', 'p.id', 'inv.product_id')
            .leftJoin('sellers as se', 'p.seller_id', 'se.id')
            .leftJoin('addresses as a', 'se.address_id', 'a.id')
            .where('p.status', 'active')
            .where('p.id', id)
            .select([
                'p.id',
                `p.seller_id as "sellerId"`,
                'p.name',
                'p.description',
                'p.rating',
                'p.status',
                `p.inventory_unit_symbol as "inventoryUnitSymbol"`,
                `p.created_at as "createdAt"`,
                `p.updated_at as "updatedAt"`,
                `p.deleted_at as "deletedAt"`,
                `inv.available_stock as "availableStock"`,
                `inv.reserved_stock as "reservedStock"`,
                `'hard coded address' as "sellerAddress"`,
                this.k.raw(`
                    (
                        select count(*)
                        from reviews r
                        where r.product_id = p.id
                    ) as "reviewCount"
                `),
            ])
            .first()) as {
            id: string
            sellerId: string
            name: string
            description: string | null
            rating: number
            status: string
            inventoryUnitSymbol: string
            availableStock: number
            reservedStock: number
            createdAt: Date
            updatedAt: Date
            deletedAt: Date | null
            reviewCount: number
            sellerAddress: string
        } | null
        if (!data) {
            return null
        }
        const imageRows = await this.k<ProductImageRow>('product_images').where(
            'product_id',
            data.id,
        )
        const sellUnitRows = await this.k<SellUnitRow>('sell_units').where(
            'product_id',
            data.id,
        )

        const images = []
        for (const i of imageRows) {
            images.push({
                id: i.id,
                url: i.url,
                position: i.position,
                isThumbnail: i.is_thumbnail,
            })
        }

        const sellUnits = []
        for (const s of sellUnitRows) {
            sellUnits.push({
                id: s.id,
                pricePerUnit: s.price_per_unit,
                displayName: s.display_name,
                isDefault: s.is_default,
                unitSymbol: s.unit_symbol,
            })
        }

        return {}
    }

    async findProductCatalogueItems(
        filters: Partial<{
            sellerId: string
        }>,
        pagination: Pagination,
    ): Promise<ProductCatalogueItemDto[]> {
        let builder = this.k<ProductRow>('products as p')
            .leftJoin('sell_units as s', 'p.id', 's.product_id')
            .leftJoin('product_images as pi', 'p.id', 'pi.product_id')
            .leftJoin('sellers as se', 'p.seller_id', 'se.id')
            .leftJoin('addresses as a', 'se.address_id', 'a.id')
            .select(
                'p.id',
                'p.name',
                'p.seller_id as "sellerId"',
                'p.rating',
                this.k.raw(`
                    (
                        select count(*)
                        from reviews r
                        where r.product_id = p.id
                    ) as "reviewCount"
                `),
                's.price_per_unit as "defaultPricePerUnit"',
                's.display_name as "defaultUnitDisplayName"',
                `'hard coded address' as "sellerAddress"`,
                'pi.url as "imageUrl"',
            )
            .where('p.status', 'active')
            .where('s.is_default', true)
            .where('pi.is_thumbnail', true)

        if (pagination) {
            builder.limit(pagination.limit)
            builder.offset(pagination.offset)
        }

        if (filters) {
            if (filters.sellerId) {
                builder.where('seller_id', filters.sellerId)
            }
        }
        return await builder
    }
}
