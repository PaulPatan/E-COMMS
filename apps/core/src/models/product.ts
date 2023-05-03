import { model, Schema, Types } from "mongoose";
export type TProduct = {
    _id?: Types.ObjectId;
    sellerId: Types.ObjectId;
    categoryId: Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
    description: string;
    discountPercentage: number;
    image: string[]; //path
    recommended: boolean;
    reviews: string[];
};

export const productSchema = new Schema<TProduct>({
    sellerId: { type: Schema.Types.ObjectId, ref: 'users', required:true },
    categoryId: { type: Schema.Types.ObjectId, ref: 'productcategories', required:true },
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    description: { type: String },
    discountPercentage: { type: Number },
    image: { type: [String] }, //path
    recommended: { type: Boolean },
    reviews: { type: [String] },
}, { versionKey: false });

//productSchema.index({name: 'text'});
export const Product = model<TProduct>("products", productSchema);
