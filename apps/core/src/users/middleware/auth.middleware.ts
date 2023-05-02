import { APIError } from '@e-comms/shared/errors';
import { Request, Response, NextFunction } from 'express';

export const authMiddleware = () => (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authorization = req.headers.authorization;
    if (!authorization) {
        return new APIError(401, { message: 'Authorization header missing' });
    }

    // const token = authorization.split(' ')[1];

    try {
        //check if token is valid


        // if (
        //     //token is invalid or expired)
        // ) {
        //     return new APIError(401, { message: 'Invalid token' });
        // }
        // req.user = { ...req.user, id: "1", role: "admin" };


        // Authentication successful
        next();
    } catch (error) {
        console.error(error);
        throw new APIError(500, { message: 'Internal server error' });
    }
};
