export const MONGO_URI: string = process.env.MONGO_URI as string;
export const MONGO_POOLSIZE: number = parseInt(process.env.MONGO_POOLSIZE || '10');
export const PORT: number = parseInt(process.env.PORT || '5000');