import { Route } from '../types';
import { ProductPostSchema, ProductUpdateSchema } from '../utils/schemas';
import * as controller from './productController';

const getProductsRoute: Route = {
    route: '/products',
    method: 'GET',
    controller: controller.getProducts,
};

const saveProductRoute: Route = {
    route: '/products',
    method: 'POST',
    body: ProductPostSchema,
    controller: controller.saveProduct,
};

const getProductByIdRoute: Route = {
    route: '/products/:id',
    method: 'GET',
    controller: controller.getProductById,
};

const deleteProductByIdRoute: Route = {
    route: '/products/:id',
    method: 'DELETE',
    controller: controller.deleteProductById,
};

const updateProductRoute: Route = {
    route: '/products/:id',
    method: 'PATCH',
    body: ProductUpdateSchema,
    controller: controller.updateProduct,
};

export const productRoutes = () => {
    return [
        getProductsRoute,
        saveProductRoute,
        getProductByIdRoute,
        deleteProductByIdRoute,
        updateProductRoute,
    ];
};
