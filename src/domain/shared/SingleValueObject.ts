import { ValueObject } from './ValueObject.js'

export abstract class SingleValueObject<T> extends ValueObject<{ value: T }> {
    protected constructor(value: T) {
        super({ value })
    }

    get value(): T {
        return this.props.value
    }
}
