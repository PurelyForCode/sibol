import { ConversionFactor } from '../../shared/value_objects/ConversionFactor.js'
import { Money } from '../../shared/value_objects/Money.js'
import { Quantity } from '../../shared/value_objects/Quantity.js'

export class SaleTotalCalculatorService {
    calculate(quantity: Quantity, pricePerUnit: Money): Money {
        return Money.create(quantity.value * pricePerUnit.value).unwrapOrThrow(
            '',
        )
    }
}
