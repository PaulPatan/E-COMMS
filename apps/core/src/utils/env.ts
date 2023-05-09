import { z } from 'zod';

export const schema = z.object({
    SALT_ROUNDS: z.string().transform((val, ctx) => {
        const parsed = Number(val);

        if (!isNaN(parsed)) {
            return parsed;
        }

        ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Not a number',
        });

        // This is a special symbol you can use to
        // return early from the transform function.
        // It has type `never` so it does not affect the
        // inferred return type.
        return z.NEVER;
    }),
    EMAIL_SENDER: z.string().nonempty().email(),
    GMAIL: z.string().nonempty().email(),
    GMAIL_PASS: z.string().nonempty(),
    JWT_SECRET: z.string().nonempty(),
    PORT: z.string().optional().default('5000'),
    MONGO_POOLSIZE: z
        .string()
        .optional()
        .default('10')
        // * Tranform zod value from string to number see (https://zod.dev/?id=validating-during-transform)
        .transform((val, ctx) => {
            const parsed = Number(val);

            if (!isNaN(parsed)) {
                return parsed;
            }

            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: 'Not a number',
            });

            // This is a special symbol you can use to
            // return early from the transform function.
            // It has type `never` so it does not affect the
            // inferred return type.
            return z.NEVER;
        }),
    MONGO_URI: z.string().nonempty(),
});

const envResult = schema.safeParse(process.env);

if (!envResult.success) {
    throw envResult.error;
}

export const Env = envResult.data;
export default Env;
