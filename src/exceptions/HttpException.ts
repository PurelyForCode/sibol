export class HttpException extends Error {
    constructor(
        readonly status: number,
        msg: string,
    ) {
        super(msg)
    }
}
