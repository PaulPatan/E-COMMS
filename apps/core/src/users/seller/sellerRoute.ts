
import * as sellerController from './sellerController';
import { Route } from '../../types';


const getSeller: Route = {
    route: '/seller',
    method: 'GET',
    role: 'seller',
    auth: true,
    middleware: [],
    controller: sellerController.getSeller
}


const postSeller: Route = {
    route: '/seller',
    method: 'POST',
    role: 'seller',
    auth: true,
    middleware: [],
    controller: sellerController.postSeller
}

export const sellersRoutes = () => {
    return [getSeller, postSeller]
}