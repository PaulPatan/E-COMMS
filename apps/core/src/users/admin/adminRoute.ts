import * as adminController from './adminController';
import { Route } from '../../types';
import { z } from 'zod';
import { sellerBody } from './adminSchema';

const body = z.object({
    name: z.string(),
    email: z.string(),
});

//example of a route using all the middleware fields
const getAdmin: Route = {
    route: '/admin',
    method: 'GET',
    // role: 'admin',
    // auth: true,
    middleware: [],
    controller: adminController.getAdmin,
};

const postAdmin: Route = {
    route: '/admin',
    method: 'POST',
    // role: 'admin',
    body,
    // auth: true,
    middleware: [],
    controller: adminController.postAdmin,
};

const createSellerAccount: Route = {
    route: '/admin/create-seller-account',
    method: 'POST',
    role: 'admin',
    body: sellerBody,
    auth: true,
    middleware: [],
    controller: adminController.createSellerAccount,
};

export const adminRoutes = () => {
    return [getAdmin, postAdmin, createSellerAccount];
};
