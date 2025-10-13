import 'dotenv/config'; 
import { z } from "zod"

const envSchema = z.object({
    TENANT_ID: z.string(),
    CLIENT_ID: z.string(),
    CLIENT_SECRET: z.string(),
    SITE_URL: z.string(),
    DRIVE_ID: z.string(),
    PORT: z.coerce.number().default(3000),
    IP_VM: z.string().default("localhost")
});

export const env = envSchema.parse(process.env);