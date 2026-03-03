import { Money } from '../../shared/value_objects/Money.js'
import { Quantity } from '../../shared/value_objects/Quantity.js'

export class SaleTotalCalculatorService {
    static calculate(quantity: Quantity, pricePerUnit: Money): Money {
        const money = Money.create(
            quantity.value * pricePerUnit.value,
        ).getValue()
        console.log(money.value)
        return money
    }
}
