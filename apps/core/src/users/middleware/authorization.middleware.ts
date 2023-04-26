import { APIError } from '@e-comms/shared/errors';
import { Request, Response, NextFunction } from 'express';

interface AuthenticationRequest extends Request {
    user: {
        role: Role;
    };
}

type Role = 'admin' | 'seller' | 'buyer';


export const roleMiddleware = (role: Role) => (
    req: AuthenticationRequest,
    res: Response,
    next: NextFunction
) => {
    if (role !== req?.user?.role) {
        return new APIError(401, { message: 'Unauthorized!' });
    }
    // Authorization successful
    next();
};
