import dotenv from "dotenv";

dotenv.config();

export const env = {
  PORT: Number(process.env.PORT ?? 3000),
  DATABASEURL: process.env.DATABASE_URL,
  ENV: process.env.ENV,
  ROLE_SELECTION_SECRET: process.env.ROLE_SELECTION_SECRET as unknown as string,
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET as unknown as string,
}