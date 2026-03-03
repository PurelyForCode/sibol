import { SingleValueObject } from '../../shared/SingleValueObject.js'
import { Result } from '../../../types/utils/Result.js'

export enum CartStatusEnum {
    Active = 'active',
}

export class CartStatus extends SingleValueObject<CartStatusEnum> {
    private constructor(value: CartStatusEnum) {
        super(value)
    }
    static create(value: CartStatusEnum) {
        return Result.ok(new CartStatus(value))
    }
    static active() {
        return new CartStatus(CartStatusEnum.Active)
    }
}
