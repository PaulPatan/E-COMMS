import mongoose from 'mongoose';
import { Env } from '../utils/env';

const connectionOptions = {
    maxPoolSize: Env.MONGO_POOLSIZE,
};

export const databaseConnection = async () => {
    return mongoose.connect(Env.MONGO_URI, connectionOptions);
};
