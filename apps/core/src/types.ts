import { Request, Response, NextFunction } from 'express';

export type MiddlewareFunction = {
    (req: Request, res: Response, next: NextFunction): void;
}

export type BodyType = {
    name: string;
    email: string;
}