import { APIError } from '@e-comms/shared/errors';
import { Request, Response, NextFunction } from 'express';
import { Role } from '../../types';

export const roleMiddleware = (role: Role) => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    // const userData = getUserAuthData();
    if (role !== req.user?.role) {
        throw new APIError(401, { message: 'Unauthorized!' });
    }
    // Authorization successful
    next();
};