import { ProductHasInsufficientAvailableStockException } from '../../../exceptions/product/ProductHasInsufficientAvailableStockException.js'
import { InternalServerError } from '../../../exceptions/shared/InternalServerError.js'
import { EntityId, Id } from '../../shared/EntityId.js'
import { Product } from '../../product/aggregates/Product.js'
import { ProductRepository } from '../../product/repositories/ProductRepository.js'
import { ProductStock } from '../../product/value_objects/ProductStock.js'
import { Cart } from '../aggregates/Cart.js'
import { CartItem } from '../entities/CartItem.js'

export class CartValidityChecker {
    constructor(private readonly pr: ProductRepository) {}

    async getProductsWithInsufficientStock(
        cart: Cart,
        itemIds?: EntityId[],
    ): Promise<EntityId[]> {
        const cartItems = cart.items
        const stockRecord: Map<Id, ProductStock> = new Map()
        const productIdsToCheck: EntityId[] = []

        // Determine which products to check
        cartItems.forEach(item => {
            const shouldCheck = itemIds
                ? itemIds.some(id => id.equals(item.id))
                : true
            if (item.isValid && shouldCheck) {
                productIdsToCheck.push(item.productId)
            }
        })

        const products = await this.pr.findProducts(productIdsToCheck)

        const insufficientStockProductIds: EntityId[] = []
        for (const item of cartItems.values()) {
            const shouldCheck = itemIds
                ? itemIds.some(id => id.equals(item.id))
                : true
            if (!item.isValid || !shouldCheck) {
                continue
            }

            const product = products.get(item.productId.value)
            if (!product) {
                throw new InternalServerError('Product is missing')
            }

            const sellUnit = product.getSellUnitById(item.sellUnitId)
            if (!sellUnit) {
                throw new InternalServerError('Sell unit should be present')
            }

            const stockToConsume = sellUnit.convertQuantityToProductStock(
                item.quantity,
            )

            // Track stock across items
            let recordedStock =
                stockRecord.get(product.id.value) ?? product.availableStock
            const subtractedStockResult = recordedStock.subtract(stockToConsume)

            if (subtractedStockResult.isError()) {
                if (subtractedStockResult.getErrorType() === 'negativeStock') {
                    insufficientStockProductIds.push(product.id)
                    continue
                } else {
                    throw new InternalServerError('Unexpected stock error')
                }
            }

            stockRecord.set(product.id.value, subtractedStockResult.getValue())
        }

        return insufficientStockProductIds
    }

    assertCartItemToBeAddedIsValid(cartItem: CartItem, product: Product) {
        const sellUnit = product.getSellUnitById(cartItem.sellUnitId)
        if (!sellUnit) {
            throw new InternalServerError('Sell unit should be present')
        }
        const stockToConsume = sellUnit.convertQuantityToProductStock(
            cartItem.quantity,
        )
        const isEnoughResult = product.availableStock.subtract(stockToConsume)
        if (isEnoughResult.isError()) {
            if (isEnoughResult.getErrorType() === 'negativeStock') {
                throw new ProductHasInsufficientAvailableStockException(
                    product.id.value,
                )
            }
        }
    }

    async validateCartItems(cart: Cart, itemIds?: EntityId[]) {
        const cartItems = cart.items
        const stockRecord: Map<Id, ProductStock> = new Map()
        const productIds: EntityId[] = []

        cartItems.forEach((item, _) => {
            const shouldValidate = itemIds
                ? itemIds.some(id => id.equals(item.id))
                : true
            if (item.isValid && shouldValidate) {
                productIds.push(item.productId)
            }
        })

        // Fetch latest product info
        const products = await this.pr.findProducts(productIds)

        // Iterate over cart items
        for (const [_key, item] of cartItems) {
            const shouldValidate = itemIds
                ? itemIds.some(id => id.equals(item.id))
                : true
            if (!item.isValid || !shouldValidate) continue

            const product = products.get(item.productId.value)
            if (!product) throw new InternalServerError('Product is missing')

            const sellUnit = product.getSellUnitById(item.sellUnitId)
            if (!sellUnit)
                throw new InternalServerError('Sell unit should be present')

            const stockToConsume = sellUnit.convertQuantityToProductStock(
                item.quantity,
            )

            // Track stock across items in this iteration
            let recordedStock =
                stockRecord.get(product.id.value) ?? product.availableStock
            const subtractedStockResult = recordedStock.subtract(stockToConsume)

            if (subtractedStockResult.isError()) {
                if (subtractedStockResult.getErrorType() === 'negativeStock') {
                    cart.invalidateItem(item.id)
                    continue
                } else {
                    throw new InternalServerError('Unexpected stock error')
                }
            }

            // Update stock record for next item
            const subtractedStock = subtractedStockResult.getValue()
            stockRecord.set(product.id.value, subtractedStock)
        }
    }
}
