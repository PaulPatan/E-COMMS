import { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

export type MiddlewareFunction = {
    (req: Request, res: Response, next: NextFunction): void;
}

export type BodyType = {
    name: string;
    email: string;
}
export type Role = 'admin' | 'seller' | 'buyer';

export type Route = {
    route: string;
    method: 'GET' | 'POST' | 'PUT' | 'DELETE';
    role?: Role;
    body?: z.ZodObject<any, any>;
    auth?: boolean;
    middleware: MiddlewareFunction[];
    controller: (req: Request, res: Response) => void;
}