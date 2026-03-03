import { AddToCartCmd, AddToCartUsecase } from './AddToCartUsecase.js'
import {
    RemoveFromCartCmd,
    RemoveFromCartUsecase,
} from './RemoveFromCartUsecase.js'
import {
    ReserveItemsForPickupCmd,
    ReserveItemsForPickupUsecase,
} from './ReserveItemsForPickupUsecase.js'

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
