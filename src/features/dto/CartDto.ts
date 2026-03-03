import { CartItemDto } from './CartItemDto.js'

export type CartDto = {
    buyerId: string
    shippingAddressId: string
    status: string
    createdAt: Date
    updatedAt: Date
    items: CartItemDto[]
}
