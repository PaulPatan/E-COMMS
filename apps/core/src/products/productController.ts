import { Response } from 'express';
import { IRequest, ProductPost, ProductUpdate } from '../types';
import * as service from './productService';

export const getProducts = async (req: IRequest, res: Response) => {
    const pagePar = /^\d+$/.test(req.query.page?.toString() || '')
        ? req.query.page?.toString()
        : undefined;
    const sizePar = /^\d+$/.test(req.query.size?.toString() || '')
        ? req.query.size?.toString()
        : undefined;
    const paginationAndFilters = {
        page: parseInt(pagePar || '1'),
        size: parseInt(sizePar || '10'),
        search: req.query.search?.toString() || '',
        category: req.query.category?.toString() || '',
    };
    const { page, size } = paginationAndFilters;
    const products = await service.getProducts(paginationAndFilters);
    const count = await service.getProductCount();
    const remain =
        Math.ceil(count / size) - page >= 0
            ? Math.ceil(count / size) - page
            : 0;
    res.set({
        'Access-Control-Allow-Headers': 'Current-Page, Remain-Page-Count',
        'Current-Page': paginationAndFilters.page,
        'Remain-Page-Count': remain,
    })
        .status(200)
        .send(products);
};

export const saveProduct = async (req: IRequest<ProductPost>) => {
    const product = await service.saveProduct(req.body);
    return product;
};

export const getProductById = (req: IRequest) => {
    const id = req.params.id;
    const product = service.getProductById(id);
    return product;
};

export const deleteProductById = (req: IRequest, res: Response) => {
    const id = req.params.id;
    service.deleteProductById(id);
    res.sendStatus(204);
};

export const updateProduct = async (req: IRequest<ProductUpdate>) => {
    const id = req.params.id;
    const product = await service.updateProduct(id, req.body);
    return product;
};
