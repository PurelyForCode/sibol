import { Result } from '../../../types/utils/Result.js'
import { SingleValueObject } from '../SingleValueObject.js'

export class ComplaintContent extends SingleValueObject<string> {
    constructor(value: string) {
        super(value)
    }

    static create(value: string): Result<ComplaintContent> {
        return Result.ok(new ComplaintContent(value))
    }
}
