import { Request, Response, NextFunction } from "express";
import { z } from "zod";

type ValidationInput = z.ZodObject<{
    body?: z.ZodType;
    params?: z.ZodType;
    query?: z.ZodType;
}>;


export function validateInput(input: ValidationInput) {
    return (req: Request, res: Response, next: NextFunction) => {
        const toParse: any = {
            body: req.body,
            params: req.params,
            query: req.query,
        };

        const result = input.safeParse(toParse);

        if (!result.success) {
            return res.status(400).json({
                status: "error",
                message: "Validation failed",
                errors: result.error.issues.map((err) => ({
                    path: err.path.join("."),
                    message: err.message,
                    code: err.code,
                })),
            });
        }

        const parsed = result.data;
        if (parsed.body) req.body = parsed.body;
        next();
    };
}
