import { APIError } from '@e-comms/shared/errors';
import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

export const validateSchema = (schema: z.ZodObject<any, any>, options?: boolean) => (
    req: Request,
    res: Response,
    next: NextFunction,
) => {
    let reqField = req.body;
    const parsedParams = schema.safeParse(reqField);
    if (parsedParams.success) {
        reqField = parsedParams.data;
        next();
    } else {
        const error = parsedParams.error;
        if (options) {
            next(error);
        }
        if (error instanceof z.ZodError) {
            const missingFields = error.issues.map((err) => err.path.join('.'));
            const message = `Missing required parameters: ${missingFields.join(', ')}`;
            throw new APIError(400, { error: message });
        }
    }
};