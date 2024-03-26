import { z } from "zod";

export const sellerBody = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
    balance: z.number(),
    address: z.object({
        postCode: z.number(),
        street: z.string(),
        city: z.string()
    })
});