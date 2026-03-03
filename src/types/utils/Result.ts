import { ValidationException } from '../../exceptions/ValidationException.js'

export class Result<T, K extends string | undefined = undefined> {
    private readonly value?: T
    readonly error?: {
        message?: string
        type?: K
    }

    private constructor(type?: K, value?: T, message?: string) {
        if (!value) {
            this.error = {}
            this.error!.message = message
            this.error!.type = type
        } else {
            this.value = value
        }
    }

    getErrorType(): K | undefined {
        if (!this.error) {
            return undefined
        }
        return this.error.type
    }

    isError(): boolean {
        return this.error !== undefined
    }

    isOk(): boolean {
        return !this.isError()
    }

    getValue(): T {
        if (this.isError()) {
            throw new Error(this.error!.message!)
        }
        return this.value as T
    }

    static ok<T, K extends string | undefined = undefined>(
        value: T,
    ): Result<T, K> {
        return new Result<T, K>(undefined, value)
    }

    static fail<T, K extends string | undefined = undefined>(
        message: string,
        type?: K,
    ): Result<T, K> {
        return new Result<T, K>(type, undefined, message)
    }

    unwrapOrThrow(field: string): T {
        if (this.isError()) {
            throw new ValidationException(field, this.error!.message!)
        }
        return this.getValue()
    }

    getMessage(): string | undefined {
        return this.error?.message
    }
}
