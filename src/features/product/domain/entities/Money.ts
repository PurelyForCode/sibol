import { ValueObject } from "../../../../lib/ValueObject.js";

interface MoneyProps {
    amount: number
}

export class Money extends ValueObject<MoneyProps> {
    private constructor(props: MoneyProps) {
        super(props)
    }

    get amount() {
        return this.props.amount
    }

    static create(amount: number) {
        if (amount < 0) {
            throw new Error("Money amount can not be a negative value")
        }
        return new Money({ amount: amount })
    }

}
