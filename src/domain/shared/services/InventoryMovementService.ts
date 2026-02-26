import { InventoryMovement } from '../../inventory/aggregates/InventoryMovement.js'
import { MovementQuantity } from '../../inventory/value_objects/MovementQuantity.js'
import { MovementReason } from '../../inventory/value_objects/MovementReason.js'
import { Product } from '../../product/aggregates/Product.js'
import { ProductStock } from '../../product/value_objects/ProductStock.js'
import { IdGenerator } from '../interfaces/IdGenerator.js'

export class InventoryMovementService {
    constructor(private readonly idGen: IdGenerator) {}

    createMovement(product: Product, stock: ProductStock) {
        const changeAmount = stock.value - product.stock.value
        const inventoryMovementId = this.idGen.generate()
        const movementQuantity =
            MovementQuantity.create(changeAmount).unwrapOrThrow('stock')
        return InventoryMovement.new(
            inventoryMovementId,
            product.id,
            movementQuantity,
            MovementReason.manualChange(),
        )
    }
}
