import * as buyerController from './buyerController';
import { Route } from '../../types';

const getBuyer: Route = {
    route: '/buyer',
    method: 'GET',
    role: 'buyer',
    auth: true,
    middleware: [],
    controller: buyerController.getBuyer
}

const postBuyer: Route = {
    route: '/buyer',
    method: 'POST',
    role: 'buyer',
    auth: true,
    middleware: [],
    controller: buyerController.postBuyer
}

export const buyerRoutes = () => {
    return [getBuyer, postBuyer]
}