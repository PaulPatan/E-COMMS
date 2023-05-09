import { APIError } from "@e-comms/shared/errors";
import mongoose from "mongoose";
import { Seller } from "../../models/users";

export const getSelleryById = async(id: string) => {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new APIError(404, { error: `Seller with the id: ${id} does not exits!` });
    }
    const entity = await Seller.findById(id);
    if (entity === null) {
        throw new APIError(404, { error: `Seller with the id: ${id} does not exits!` });
    }
    return entity;
}

export const generateInvoice = async (id: string) => {
    // const seller = await getSelleryById(id);
    console.log(`Seller id: ${id} `);
    // return invoice;
}