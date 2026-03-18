import { Knex } from 'knex'
import { ProductImageRow, SellUnitRow } from '../tables/TableDefinitions.js'
import { ProductDetailsDto } from '../../api/query/dto/ProductDetailsDto.js'
import { ProductCatalogueItemDto } from '../../api/query/dto/ProductCatalogueItemDto.js'

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
                `p.seller_id as sellerId`,
                'p.name',
                'p.description',
                'p.rating',
                'p.status',
                `p.inventory_unit_symbol as inventoryUnitSymbol`,
                `p.created_at as createdAt`,
                `p.updated_at as updatedAt`,
                `p.deleted_at as deletedAt`,
                `p.review_count as reviewCount`,
                `inv.available_stock as availableStock`,
                `inv.reserved_stock as reservedStock`,
                this.k.raw(`'San Ildefonso, Bulacan' as "sellerAddress"`),
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

        return {
            id: data.id,
            sellerId: data.sellerId,
            name: data.name,
            description: data.description,
            status: data.status,
            inventoryUnitSymbol: data.inventoryUnitSymbol,
            availableStock: data.availableStock,
            reservedStock: data.reservedStock,
            rating: data.rating,
            reviewCount: data.reviewCount,
            sellerAddress: data.sellerAddress,
            createdAt: data.createdAt,
            updatedAt: data.updatedAt,
            deletedAt: data.deletedAt,
            images: images,
            sellUnits: sellUnits,
        }
    }

    async findProductCatalogueItems(
        filters: Partial<{
            sellerId: string
        }>,
        page: number = 1,
    ): Promise<ProductCatalogueItemDto[]> {
        const baseProducts = this.k('products as p').select(
            'p.id',
            'p.name',
            'p.seller_id',
            'p.rating',
            'p.review_count',
        )
        // .where('p.status', 'active')

        if (filters?.sellerId) {
            baseProducts.where('p.seller_id', filters.sellerId)
        }

        baseProducts.limit(20)
        if (page > 1) {
            baseProducts.offset(page - 1 * 20)
        }

        const k = this.k
        const query = this.k(baseProducts.as('p'))
            .leftJoin('sell_units as s', function () {
                this.on('p.id', 's.product_id').andOn(
                    's.is_default',
                    k.raw('true'),
                )
            })
            .leftJoin('product_images as pi', function () {
                this.on('p.id', 'pi.product_id').andOn(
                    'pi.is_thumbnail',
                    k.raw('true'),
                )
            })
            .leftJoin('sellers as se', 'p.seller_id', 'se.id')
            .leftJoin('addresses as a', 'se.address_id', 'a.id')
            .select(
                'p.id',
                'p.name',
                'p.seller_id as sellerId',
                'p.rating',
                'p.review_count as reviewCount',
                's.price_per_unit as defaultPricePerUnit',
                's.display_name as defaultUnitDisplayName',
                'pi.url as imageUrl',
                this.k.raw(`'San Ildefonso, Bulacan' as "sellerAddress"`),
            )
            .orderBy('p.rating', 'desc')
            .orderBy('p.review_count', 'desc')

        const rows = await query

        return rows as ProductCatalogueItemDto[]
    }
}
