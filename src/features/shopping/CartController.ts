import {
    AddToCartCmd,
    AddToCartUsecase,
} from './add_to_cart/AddToCartUsecase.js'
import {
    RemoveFromCartCmd,
    RemoveFromCartUsecase,
} from './remove_from_cart/RemoveFromCartUsecase.js'

export class CartController {
    constructor(
        private readonly addToCartUsecase: AddToCartUsecase,
        private readonly removeFromCartUsecase: RemoveFromCartUsecase,
    ) {}
    async addToCart(cmd: AddToCartCmd) {
        await this.addToCartUsecase.execute(cmd)
    }

    async removeFromCart(cmd: RemoveFromCartCmd) {
        await this.removeFromCartUsecase.execute(cmd)
    }
}
