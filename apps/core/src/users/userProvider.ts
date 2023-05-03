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

export const createUser = async (userModel: RegisterDTO) => {
    const {
        firstName,
        lastName,
        email,
        password,
        address: { postCode, street, city },
    } = userModel;

    return await User.Buyer.create({
        firstName,
        lastName,
        email,
        password,
        address: { postCode, street, city },
    });
};
