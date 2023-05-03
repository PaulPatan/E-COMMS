import { APIError } from "@e-comms/shared/errors";
import mongoose from "mongoose";
import { ProductCategory } from "../models/productCategory";

export const getProductCategoryById = async(id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new APIError(404, { error: `Product with the id: ${id} does not exits!` });
    }
    const entity = await ProductCategory.findById(id);
    if (entity === null) {
        throw new APIError(404, { error: `Product with the id: ${id} does not exits!` });
    }
    return entity;
}