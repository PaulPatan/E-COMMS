import { Request, Response, NextFunction } from 'express';

import * as sellerController from './sellerController';
import { MiddlewareFunction } from '../../types';


const getSellerRoute = {
    route: '/seller',
    method: 'GET' as const,
    middleware: [((req: Request, res: Response, next: NextFunction) => {
        next();
    }) as MiddlewareFunction],
    controller: sellerController.getSeller
}


const postSellerRoute = {
    route: '/seller',
    method: 'POST' as const,
    middleware: [((req: Request, res: Response, next: NextFunction) => {
        next();
    }) as MiddlewareFunction],
    controller: sellerController.postSeller
}

export const sellersRoutes = () => {
    return [getSellerRoute, postSellerRoute]
}