import {
    AddToCartCmd,
    AddToCartUsecase,
} from './add_to_cart/AddToCartUsecase.js'
import {
    RemoveFromCartCmd,
    RemoveFromCartUsecase,
} from './remove_from_cart/RemoveFromCartUsecase.js'
import {
    ReserveItemsForPickupCmd,
    ReserveItemsForPickupUsecase,
} from './reserve_items_for_pickup/ReserveItemsForPickupUsecase.js'

export class CartController {
    constructor(
        private readonly addToCartUsecase: AddToCartUsecase,
        private readonly removeFromCartUsecase: RemoveFromCartUsecase,
        private readonly reserveItemsForPickupUsecase: ReserveItemsForPickupUsecase,
    ) {}
    async addToCart(cmd: AddToCartCmd) {
        await this.addToCartUsecase.execute(cmd)
    }

    async removeFromCart(cmd: RemoveFromCartCmd) {
        await this.removeFromCartUsecase.execute(cmd)
    }
    async reserveItemsForPickup(cmd: ReserveItemsForPickupCmd) {
        await this.reserveItemsForPickupUsecase.execute(cmd)
    }
}
