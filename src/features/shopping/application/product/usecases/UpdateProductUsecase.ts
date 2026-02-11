import { UnitOfMeasure } from "../../../domain/entities/product/UnitOfMeasurement.js"

export type UpdateProductCmd = {
    productId: string
    sellerId: string
    name?: string
    description?: string
    stock?: number
    unit?: {
        unitOfMeasurement: UnitOfMeasure
        unitValue: number
    }
}
