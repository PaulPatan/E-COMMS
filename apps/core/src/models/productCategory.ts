import { model, Schema, Types } from "mongoose";

type TProductCategory = {
    id: Types.ObjectId;
    title: string;
};

const productCategorySchema = new Schema<TProductCategory>({
    title: { type: String, required: true },
});

export const ProductCategory = model<TProductCategory>(
    "ProductCategory",
    productCategorySchema
);
