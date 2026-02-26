import { SingleValueObject } from '../../../lib/domain/SingleValueObject.js'
import { Result } from '../../../lib/utils/Result.js'

export enum MovementReasonValues {
    Purchase = 'purchased',
    Manual_Change = 'manual change',
}

export class MovementReason extends SingleValueObject<MovementReasonValues> {
    static readonly validValues: MovementReasonValues[] = [
        MovementReasonValues.Manual_Change,
        MovementReasonValues.Purchase,
    ]

    private constructor(value: MovementReasonValues) {
        super(value)
    }

    static create(value: string): Result<MovementReason> {
        const normalized = value.trim().toLowerCase() as MovementReasonValues
        if (!MovementReason.validValues.includes(normalized)) {
            return Result.fail('Inventory movement is invalid')
        }

        return Result.ok(new MovementReason(normalized))
    }
    static manualChange() {
        return new MovementReason(MovementReasonValues.Manual_Change)
    }
}
