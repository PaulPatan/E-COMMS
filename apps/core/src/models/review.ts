import { model, Schema, Types } from "mongoose";

type TReview = {
    id: Types.ObjectId;
    buyerId: Types.ObjectId;
    creationDate: string;
    description: string;
    rating: number[];
    marked: {
        pinned: boolean; //(default value is false)
        description: string;
    };
};

const reviewSchema = new Schema<TReview>({
    buyerId: { type: Schema.Types.ObjectId, ref: "usres" },
    creationDate: { type: String },
    description: { type: String },
    rating: { type: (Number[5] = [1, 2, 3, 4, 5]) },
});

export const Review = model<TReview>("Review", reviewSchema);
