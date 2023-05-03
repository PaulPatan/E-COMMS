import mongoose from "mongoose";
import { MONGO_URI, MONGO_POOLSIZE } from "../utils/env";

const connectionOptions = {
    maxPoolSize: MONGO_POOLSIZE,
};

export const databaseConnection = async () => {
    return mongoose.connect(MONGO_URI, connectionOptions);
}