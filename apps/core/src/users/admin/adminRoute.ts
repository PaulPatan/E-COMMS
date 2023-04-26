import { Request, Response, NextFunction } from 'express';
import * as adminController from './adminController';
import { MiddlewareFunction } from '../../types';


const getAdminRoute = {
    route: '/admin',
    method: 'GET' as const,
    middleware: [((req: Request, res: Response, next: NextFunction) => {
        next();
    }) as MiddlewareFunction],
    controller: adminController.getAdmin
}


const postAdminRoute = {
    route: '/admin',
    method: 'POST' as const,
    middleware: [((req: Request, res: Response, next: NextFunction) => {
        next();
    }) as MiddlewareFunction],
    controller: adminController.postAdmin
}

export const adminRoutes = () => {
    return [getAdminRoute, postAdminRoute]
}