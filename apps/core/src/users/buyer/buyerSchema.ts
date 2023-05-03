import { z } from "zod";

export const registerBody = z.object({
    firstName: z.string(),
    lastName: z.string(),
    email: z.string().email(),
    password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
    address: z.object({
        postCode: z.number(),
        street: z.string(),
        city: z.string()
    })
});

export const loginBody = z.object({
    email: z.string().email(),
    password: z.string().min(8).regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/),
});

// export type RegisterBody = z.infer<typeof registerBody>;
// export type LoginBody = z.infer<typeof loginBody>;