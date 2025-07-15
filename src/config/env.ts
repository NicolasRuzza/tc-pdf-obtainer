// import { z } from "zod"

// const envSchema = z.object({
//   TENANT_ID: z.string(),
//   CLIENT_ID: z.string(),
//   CLIENT_SECRET: z.string(),
//   SITE_URL: z.string(),
//   DRIVE_ID: z.string(),
//   DIR_ID_ASSITTEC: z.string(),
//   PORT: z.coerce.number().default(3000),
// });

// export const env = envSchema.parse(process.env);

import dotenv from 'dotenv';
dotenv.config();

export const {
  TENANT_ID,
  CLIENT_ID,
  CLIENT_SECRET,
  SITE_URL,
  DRIVE_ID,
  PORT
} = process.env;