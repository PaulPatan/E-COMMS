import { APIError } from "@e-comms/shared/errors";
import mongoose from "mongoose"

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