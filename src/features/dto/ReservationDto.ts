export type ReservationDto = {
    id: string
    buyerId: string
    productId: string
    sellUnitId: string
    quantity: number
    pickupDate: Date
    status: string
    createdAt: Date
    updatedAt: Date
}
