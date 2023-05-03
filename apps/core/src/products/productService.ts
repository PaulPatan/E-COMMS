import {
    mapProductDtoToModel,
    mapProductModelToDto,
} from '../mapper/productMapper';
import { TProduct } from '../models/product';
import * as categoryProvider from '../productCategories/productCategoryProvider';
import { paginationAndFilters, ProductPost, ProductUpdate } from '../types';
import * as sellerProvider from '../users/seller/sellerProvider';
import * as provider from './productProvider';

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
    const dtos = await Promise.all(
        products.map((product: TProduct) => {
            if (product.categoryId !== null) {
                return mapProductModelToDto(product);
            }
            return null;
        })
    );
    return dtos.filter((dto) => dto !== null);
};

export const saveProduct = async (product: ProductPost) => {
    await sellerProvider.getSelleryById(product.sellerId);
    await categoryProvider.getProductCategoryById(product.categoryId);
    const inserted = await provider.saveProduct(mapProductDtoToModel(product));
    const dto = await mapProductModelToDto(inserted);
    return dto;
};

export const getProductById = async (id: string) => {
    const product = await provider.getProductExistsById(id);
    const dto = await mapProductModelToDto(product);
    return dto;
};

export const deleteProductById = async (id: string) => {
    await provider.getProductExistsById(id);
    await provider.deleteProductById(id);
};

export const updateProduct = async (id: string, update: ProductUpdate) => {
    await provider.getProductExistsById(id);
    const updated = await provider.updateProduct(id, update);
    const dto = await mapProductModelToDto(updated);
    return dto;
};
