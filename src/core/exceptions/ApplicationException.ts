export abstract class ApplicationException extends Error {
    static readonly code: string

    protected constructor(message: string) {
        super(message)
        this.name = this.constructor.name
    }
}
