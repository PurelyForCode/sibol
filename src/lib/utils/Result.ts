export class Result<T> {
    private constructor(
        public readonly isSuccess: boolean,
        public readonly error?: string,
        private readonly _value?: T,
    ) {}

    get value(): T {
        if (!this.isSuccess) {
            throw new Error('Cannot get value of a failed result')
        }
        return this._value as T
    }

    public static ok<T>(value: T): Result<T> {
        return new Result(true, undefined, value)
    }

    public static fail<T>(error: string): Result<T> {
        return new Result<T>(false, error)
    }
}
