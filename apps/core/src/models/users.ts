import { model, Schema, Types } from "mongoose";
import bcrypt from "bcrypt";

export type TBuyer = {
    _id?: Types.ObjectId;
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
    ] | [];
    favorites: string[];
};

const buyerSchema = new Schema<TBuyer>({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    passwordSalt: { type: String },
    address: {
        postCode: { type: Number, required: true },
        street: { type: String, required: true },
        city: { type: String, required: true },
    },
    role: { type: String, default: "buyer" },
    creditCardInfo: [
        {
            name: { type: String },
            number: { type: String },
            ccv: { type: Number },
        },
    ],
    favorites: { type: [String] },
}, { versionKey: false });

buyerSchema.pre<TBuyer>("save", async function (next) {
    const hash = await bcrypt.hash(this.password, 10);
    this.password = hash;
    next();
});

export const Buyer = model<TBuyer>("Buyer", buyerSchema, "users");

export type TSeller = {
    _id: Types.ObjectId;
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
    // _id: { type: Schema.Types.ObjectId },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    passwordSalt: { type: String, required: true },
    role: { type: String, default: 'seller', required: true },
    balance: { type: Number },
    creditCardInfo: [
        {
            name: { type: String },
            number: { type: String },
            ccv: { type: Number },
        },
    ],
});

export const Seller = model<TSeller>('Seller', sellerSchema, 'users');

export type TAdmin = {
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
    role: { type: String, default: 'admin', required: true },
});

export const Admin = model<TAdmin>('Admin', adminSchema, 'users');
