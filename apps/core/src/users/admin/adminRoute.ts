import * as adminController from './adminController';
import { MiddlewareFunction } from '../../types';
import { authMiddleware } from '../middleware/auth.middleware';
import { z } from 'zod';
import { roleMiddleware } from '../middleware/authorization.middleware';
import { validateSchema } from '../middleware/validateSchema';

const body = z.object({
    name: z.string(),
    email: z.string()
});



//example of a route using all the middleware
const getAdminRoute = {
    route: '/admin',
    method: 'GET' as const,
    role: 'admin' as const,
    middleware: [roleMiddleware('admin'), authMiddleware(), validateSchema(body)] as MiddlewareFunction[],
    controller: adminController.getAdmin
}


const postAdminRoute = {
    route: '/admin',
    method: 'POST' as const,
    middleware: [validateSchema(body)] as MiddlewareFunction[],
    controller: adminController.postAdmin
}

export const adminRoutes = () => {
    return [getAdminRoute, postAdminRoute]
}