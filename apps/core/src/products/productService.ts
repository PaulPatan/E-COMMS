import { APIError } from '@e-comms/shared/errors';
import {
    mapProductDtoToModel,
    mapProductModelToDto,
} from '../mapper/productMapper';
import { TProduct } from '../models/product';
import * as categoryProvider from '../productCategories/productCategoryProvider';
import {
    paginationAndFilters,
    ProductDto,
    ProductPost,
    ProductUpdate,
} from '../types';
import * as sellerProvider from '../users/seller/sellerProvider';
import Env from '../utils/env';
import * as provider from './productProvider';
import fetch from 'node-fetch';

export const getProductCount = async () => {
    const count = await provider.getProductCount();
    return count;
};

export const getProducts = async (queries: paginationAndFilters) => {
    const products = await provider.getProducts(
        queries.page,
        queries.size,
        queries.search,
        queries.category
    );
    let dtos = await Promise.all(
        products.map((product: TProduct) => {
            return mapProductModelToDto(product);
        })
    );
    dtos = dtos.filter((dto) => dto !== undefined);
    const responses = await Promise.all(
        dtos.map((product: ProductDto) => {
            return fetch(`${Env.RESOURCE_HOST}/image/${product.id}`, {
                method: 'GET',
            });
        })
    );
    const images = await Promise.all(
        responses.map((res) => {
            return res.json();
        })
    );
    dtos.forEach((dto, index) => {
        if (responses[index].status < 400) {
            dto.image = images[index] as string[];
        } else {
            dto.image = [];
        }
    });
    return dtos;
};

export const saveProduct = async (product: ProductPost) => {
    await sellerProvider.getSelleryById(product.sellerId);
    await categoryProvider.getProductCategoryById(product.categoryId);
    const inserted = await provider.saveProduct(mapProductDtoToModel(product));
    const dto = await mapProductModelToDto(inserted);
    dto.image = product.image;
    const responses = await Promise.all(
        product.image.map((img) => {
            return fetch(`${Env.RESOURCE_HOST}/image/${dto.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: img }),
            });
        })
    );
    let error = false;
    for (let i = 0; i < responses.length; i++) {
        if (responses[i].status == 400) {
            error = true;
            break;
        }
    }
    if (error) {
        await deleteProductById(dto.id || '');
        throw new APIError(400, { error: `Wrong base64 format for images!` });
    }
    return dto;
};

export const getProductById = async (id: string) => {
    const product = await provider.getProductExistsById(id);
    const dto = await mapProductModelToDto(product);
    const res = await fetch(`${Env.RESOURCE_HOST}/image/${dto.id}`, {
        method: 'GET',
    });
    if (res.status < 400) {
        dto.image = (await res.json()) as string[];
    } else {
        dto.image = [];
    }
    return dto;
};

export const deleteProductById = async (id: string) => {
    await provider.getProductExistsById(id);
    await provider.deleteProductById(id);
    await fetch(`${Env.RESOURCE_HOST}/image/${id}`, {
        method: 'DELETE',
    });
};

export const updateProduct = async (id: string, update: ProductUpdate) => {
    await provider.getProductExistsById(id);
    const images = update.image || [];
    update.image = [];
    const updated = await provider.updateProduct(id, update);
    const dto = await mapProductModelToDto(updated);
    dto.image = images;
    await fetch(`${Env.RESOURCE_HOST}/image/${id}`, {
        method: 'DELETE',
    });
    const responses = await Promise.all(
        dto.image.map((img) => {
            return fetch(`${Env.RESOURCE_HOST}/image/${dto.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ image: img }),
            });
        })
    );
    let error = false;
    for (let i = 0; i < responses.length; i++) {
        if (responses[i].status == 400) {
            error = true;
            break;
        }
    }
    if (error) {
        throw new APIError(400, { error: `Wrong base64 format for images!` });
    }
    return dto;
};
