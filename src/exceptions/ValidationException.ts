import { Result } from '../lib/utils/Result.js'

export class ValidationException extends Error {
    readonly field: string

    constructor(field: string, msg: string) {
        super(msg)
        this.field = field
    }
}
