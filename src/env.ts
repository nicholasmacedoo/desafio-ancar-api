import { z } from "zod";

export const envSchema = z.object({
    SEQUELIZE_DATABASE_HOST: z.string(),
    SEQUELIZE_DATABASE_PORT: z.coerce.number(),
    SEQUELIZE_DATABASE_USERNAME: z.string(),
    SEQUELIZE_DATABASE_PASSWORD: z.string(),
    SEQUELIZE_DATABASE_DATABASENAME: z.string(),
    JWT_SECRET: z.string(),
})

export type Env = z.infer<typeof envSchema>