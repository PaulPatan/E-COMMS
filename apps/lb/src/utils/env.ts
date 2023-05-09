import { z } from 'zod';

export const schema = z.object({
    PORT: z.string().optional().default('8080'),
    SERVERS: z.string().transform((val) => val.split(',')),
    MAX_REQUEST: z
        .string()
        .optional()
        .default('100')
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
    WINDOW_MS: z
        .string()
        .optional()
        .default('15') // * Window is 15 seconds by default
        .transform((val, ctx) => {
            const parsed = Number(val);

            if (!isNaN(parsed)) {
                return parsed * 1000; // * Multiple MS by 1000 to get seconds
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
});

const envResult = schema.safeParse(process.env);

if (!envResult.success) {
    throw envResult.error;
}

export const Env = envResult.data;
export default Env;
