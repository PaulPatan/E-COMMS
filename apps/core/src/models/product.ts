import { model, Schema, Types } from "mongoose";
export type TProduct = {
    id: Types.ObjectId;
    sellerId: Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
    description: string;
    discountPercentage: number;
    image: string[]; //path
    recommended: boolean;
    reviews: string[];
};

const productSchema = new Schema<TProduct>({
    sellerId: { type: Schema.Types.ObjectId, ref: "users", required: true },
    name: { type: String },
    price: { type: Number },
    quantity: { type: Number },
    description: { type: String },
    discountPercentage: { type: Number },
    image: { type: [String] }, //path
    recommended: { type: Boolean },
    reviews: { type: [String] },
});

export const Product = model<TProduct>("Product", productSchema);
