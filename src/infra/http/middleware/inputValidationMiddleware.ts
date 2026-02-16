import { NextFunction, Request, Response } from 'express'
import { ZodType } from 'zod'

export function inputValidation<
    T extends ZodType<{ body?: unknown; params?: unknown; query?: unknown }>,
>(schema: T) {
    return (req: Request, res: Response, next: NextFunction) => {
        const toParse = {
            body: req.body,
            params: req.params,
            query: req.query,
        }

        const result = schema.safeParse(toParse)

        if (!result.success) {
            return res.status(400).json({
                status: 'error',
                message: 'Validation failed',
                errors: result.error.issues.map(err => ({
                    path: err.path.join('.'),
                    message: err.message,
                    code: err.code,
                })),
            })
        }

        req.validated = result.data
        next()
    }
}
