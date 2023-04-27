import { model, Schema, Types } from "mongoose";

type TBuyer = {
    id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordSalt: string;
    address: {
        postCode: number;
        street: string;
        city: string;
    };
    role: string;
    creditCardInfo: [
        {
            name: string;
            number: string;
            ccv: number;
        }
    ];
    favorites: string[];
};

const buyerSchema = new Schema<TBuyer>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    passwordSalt: { type: String, required: true },
    address: {
        postCode: { type: Number, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
    },
    role: { type: String, roles: "buyer", required: true },
    creditCardInfo: [
        {
            name: { type: String },
            number: { type: String },
            ccv: { type: Number },
        },
    ],
    favorites: { type: [String] },
});

export const Buyer = model<TBuyer>("Buyer", buyerSchema, "users");

type TSeller = {
    id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordSalt: string;
    role: string;
    balance: number;
    creditCardInfo: [
        {
            name: string;
            number: string;
            ccv: number;
        }
    ];
};

const sellerSchema = new Schema<TSeller>({
    _id: { type: Schema.Types.ObjectId },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    passwordSalt: { type: String, required: true },
    role: { type: String, roles: "seller", required: true },
    balance: { type: Number },
    creditCardInfo: [
        {
            name: { type: String },
            number: { type: String },
            ccv: { type: Number },
        },
    ],
});

export const Seller = model<TSeller>("Seller", sellerSchema, "users");

type TAdmin = {
    id: Types.ObjectId;
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    passwordSalt: string;
    role: string;
};

const adminSchema = new Schema<TAdmin>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    passwordSalt: { type: String, required: true },
    role: { type: String, roles: "admin", required: true },
});

export const Admin = model<TAdmin>("Admin", adminSchema, "users");
