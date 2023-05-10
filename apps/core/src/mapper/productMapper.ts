import { TProduct } from "../models/product";
import mongoose from "mongoose";
import { ProductDto, ProductPost } from "../types";
import { Seller } from "../models/users";
import { ProductCategory } from "../models/productCategory";

export const mapProductDtoToModel = (dto: ProductPost): TProduct => {
    return {
        sellerId: new mongoose.Types.ObjectId(dto.sellerId),
        categoryId: new mongoose.Types.ObjectId(dto.categoryId),
        name: dto.name,
        price: dto.price,
        quantity: dto.quantity,
        description: dto.description,
        discountPercentage: dto.discountPercentage,
        recommended: true,
        reviews: [],
    }
}

export const mapProductModelToDto = async (model: TProduct): Promise<ProductDto> => {
    const seller = await Seller.findById(model.sellerId);
    const category = await ProductCategory.findById(model.categoryId);
    return {
        id: model._id?.toHexString(),
        seller: `${seller?.firstName} ${seller?.lastName}`,
        category: `${category?.title}`,
        name: model.name,
        price: model.price,
        quantity: model.quantity,
        description: model.description,
        discountPercentage: model.discountPercentage,
        image: [],
        recommended: model.recommended,
        reviews: model.reviews,
    }
}