import { Request, Response, NextFunction } from 'express';
import { AnyZodObject, ZodError } from 'zod';

const validate =
    (schema: AnyZodObject) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.parse({
                    body: req.body,
                    query: req.query,
                    params: req.params,
                });
                next();
            } catch (err: any) {
                if (err instanceof ZodError) {
                    return res.status(400).json({
                        success: false,
                        error: 'Validation Error',
                        details: err.issues, // Use .issues in newer Zod
                    });
                }
                return res.status(500).json({
                    success: false,
                    error: 'Internal Server Error',
                });
            }
        };

export default validate;
