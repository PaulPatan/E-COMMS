import { model, Schema, Types } from "mongoose";
import { TProduct } from "./product";

type TCart = {
    id: Types.ObjectId;
    buyerId: Types.ObjectId;
    products: TProduct[];
};

const userCartSchema = new Schema<TCart>({
    buyerId: { type: Schema.Types.ObjectId, ref: "users" },
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
                required: true,
            },
            quantity: { type: Number },
        },
    ],
});

export const Cart = model<TCart>("Cart", userCartSchema);
