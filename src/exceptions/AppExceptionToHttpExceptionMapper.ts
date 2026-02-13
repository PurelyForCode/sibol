import { ApplicationException } from '../core/exceptions/ApplicationException.js'
import { HttpException } from '../core/exceptions/HttpException.js'

export class AppExceptionToHttpExceptionMapper {
    private readonly statusCodeConversionTable = new Map<string, number>()

    register(code: string, status: number) {
        this.statusCodeConversionTable.set(code, status)
    }

    convert(error: unknown): HttpException {
        if (!(error instanceof ApplicationException)) {
            return new HttpException(500, 'Internal server error')
        }

        const constructor = error.constructor as typeof ApplicationException
        const status = this.statusCodeConversionTable.get(constructor.code)

        if (status === undefined) {
            return new HttpException(
                500,
                'Unmapped application exception thrown',
            )
        }

        return new HttpException(status, error.message)
    }
}
