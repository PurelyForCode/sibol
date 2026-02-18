import { SingleValueObject } from '../../../lib/domain/SingleValueObject.js'
import { Result } from '../../../lib/utils/Result.js'

export class ImagePosition extends SingleValueObject<number> {
    private constructor(value: number) {
        super(value)
    }

    static create(value: number) {
        if (value < 0) {
            return Result.fail('Image position can not be lower than 0')
        }
        return Result.ok(new ImagePosition(value))
    }
}
