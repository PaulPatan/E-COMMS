import { Request, Response, NextFunction } from 'express';

import * as buyerController from './buyerController';
import { MiddlewareFunction } from '../../types';

const getBuyerRoute = {
    route: '/buyer',
    method: 'GET' as const,
    middleware: [((req: Request, res: Response, next: NextFunction) => {
        next();
    }) as MiddlewareFunction],
    controller: buyerController.getBuyer
}

const postBuyerRoute = {
    route: '/buyer',
    method: 'POST' as const,
    middleware: [((req: Request, res: Response, next: NextFunction) => {
        next();
    }) as MiddlewareFunction],
    controller: buyerController.postBuyer
}

export const buyerRoutes = () => {
    return [getBuyerRoute, postBuyerRoute]
}