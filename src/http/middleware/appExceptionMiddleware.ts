import { Request, Response, NextFunction } from 'express'
import { ApplicationException } from '../../core/exceptions/ApplicationException.js'
import { HttpException } from '../../core/exceptions/HttpException.js'
import { applicationExceptionMapper } from '../../compositionRoot.js'

export function appExceptionMiddleware() {
    return function (
        err: unknown,
        _req: Request,
        res: Response,
        _next: NextFunction,
    ) {
        const httpException =
            err instanceof HttpException
                ? err
                : applicationExceptionMapper.convert(err)

        if (!(err instanceof ApplicationException)) {
            console.error(err)
        }

        res.status(httpException.status).json({
            error: httpException.message,
        })
    }
}
