import { APIError } from "@e-comms/shared/errors";
import mongoose from "mongoose";
import { Filter } from "../types";
import PasswordValidator from "password-validator";
import { Buyer } from "../models/users";

export async function checkMongoIdAndReturnObject<T>(id: string, check: mongoose.Model<T>, type: string) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
        throw new APIError(404, { error: `${type} with the id: ${id} does not exits!` });
    }
    const entity = await check.findById(id);
    if (entity === null) {
        throw new APIError(404, { error: `${type} with the id: ${id} does not exits!` });
    }
    return entity;
}

export async function checkMongoIdByFilterAndReturnObject<T>(filter: Filter, check: mongoose.Model<T>, type: string) {
    if (!mongoose.Types.ObjectId.isValid(filter._id)) {
        throw new APIError(404, { error: `${type} with the id: ${filter._id} does not exits!` });
    }
    const entity = await check.findOne(filter, {});
    if (entity === null) {
        throw new APIError(404, { error: `${type} with the id: ${filter._id} does not exits!` });
    }
    return entity;
}

export function checkPassword(password: string) {
    const schema = new PasswordValidator();
    schema.is().min(12)
        .has().uppercase()
        .has().lowercase()
        .has().digits()
        .has().symbols();
    if (!schema.validate(password)) {
        throw new APIError(400, { error: `Password not strong enough!` });
    }
}

export async function checkEmail(email: string) {
    const buyers = await Buyer.find({ email, role: 'buyer'});
    if (buyers.length > 0) {
        throw new APIError(400, { error: `Buyer with the given email already exists!` });
    }
}
