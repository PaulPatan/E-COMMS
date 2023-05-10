import { APIError } from '@e-comms/shared/errors';
import mongoose from 'mongoose';
import { Product, TProduct } from '../models/product';
import { ProductUpdate } from '../types';

export const getProductExistsById = async (id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new APIError(404, {
            error: `Product with the id: ${id} does not exits!`,
        });
    }
    const entity = await Product.findById(id);
    if (entity === null) {
        throw new APIError(404, {
            error: `Product with the id: ${id} does not exits!`,
        });
    }
    return entity;
};

export const getProductCount = async () => {
    const count = await Product.countDocuments();
    return count;
};

export const getProducts = async (
    page: number,
    size: number,
    matchPar: string,
    filterPar: string
) => {
    const match =
        matchPar === ''
            ? {}
            : {
                  $or: [
                      { name: { $regex: `${matchPar}`, $options: 'i' } },
                      { description: { $regex: `${matchPar}`, $options: 'i' } },
                  ],
              };
    const filter =
        filterPar === ''
            ? {}
            : {
                  title: {
                      $in: filterPar.split(','),
                  },
              };
    const products = await Product.find(match, {})
        .populate({
            path: 'categoryId',
            match: filter,
        })
        .skip((page - 1) * size)
        .limit(size);
    return products;
};

export const saveProduct = async (product: TProduct) => {
    const inserted = Product.create(product);
    return inserted;
};

export const deleteProductById = async (id: string) => {
    await Product.findByIdAndDelete(id);
};

export const updateProduct = async (id: string, update: ProductUpdate) => {
    const product = (await Product.findByIdAndUpdate(id, update, {
        new: true,
    })) as TProduct;
    return product;
};
