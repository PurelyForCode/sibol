import { ValidationException } from '../../exceptions/ValidationException.js'

export class Result<T> {
    private readonly value?: T
    readonly message?: string

    private constructor(value?: T, message?: string) {
        this.value = value
        this.message = message
    }

    isError(): boolean {
        return this.message !== undefined
    }

    isOk(): boolean {
        return !this.isError()
    }

    getValue(): T {
        if (this.isError()) {
            throw new Error('Cannot get the value of a failed Result')
        }
        return this.value as T
    }

    static ok<T>(value: T): Result<T> {
        return new Result(value)
    }

    static fail<T>(message: string): Result<T> {
        return new Result<T>(undefined, message)
    }

    unwrapOrThrow<T>(field: string) {
        if (this.isError()) {
            throw new ValidationException(field, this.message!)
        }
        return this.getValue()
    }
}
