import { z } from 'zod';

export const ProductPostSchema = z.object({
    sellerId: z.string(),
    categoryId: z.string(),
    name: z.string().max(255),
    price: z.number().min(1),
    quantity: z.number().min(0),
    description: z.string().max(4096),
    discountPercentage: z.number().min(0).max(100),
    image: z.array(z.string()),
}).strict();

export const ProductUpdateSchema = z.object({
    categoryId: z.string().optional(),
    name: z.string().max(255).optional(),
    price: z.number().min(1).optional(),
    quantity: z.number().min(0).optional(),
    description: z.string().max(4096).optional(),
    discountPercentage: z.number().min(0).max(100).optional(),
    image: z.array(z.string()).optional(),
}).strict();
