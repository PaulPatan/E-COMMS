import mongoose from "mongoose";
import * as User from "../models/users";
import { RegisterDTO } from "../types";

export async function getUserByEmail(email: string) {
    const buyer = await User.Buyer.findOne({ email: email });
    if (buyer) {
        return buyer;
    }
    const seller = await User.Seller.findOne({ email: email });
    if (seller) {
        return seller;
    }
    const admin = await User.Admin.findOne({ email: email });
    if (admin) {
        return admin;
    }
}

export const createUser = async <T>(userModel: RegisterDTO, model: mongoose.Model<T> ) => {
    const {
        firstName,
        lastName,
        email,
        password,
        address: { postCode, street, city },
    } = userModel;

    return await model.create({
        firstName,
        lastName,
        email,
        password,
        address: { postCode, street, city },
    });
};
