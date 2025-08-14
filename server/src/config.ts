/**
 * Define constants and default server values
 * Uses doetnev to load environment variables from .env
 */
import crypto from "crypto";
import { config } from "dotenv";

// instantiate config
const conf = config();

if (!conf) {
  console.error("env vars failed to load");
} else {
  console.log("env vars loaded successfully");
}

/**
 * Exports
 */
export default {
  OP_ENV: process.env.NODE_ENV || "dev",
  SERVER_PORT: process.env.SERVER_PORT,
  SERVER_HOST: process.env.SERVER_HOST,
  DB_URI: process.env.DB_URI as string,
  DB_NAME: process.env.DB_NAME as string,
  TOKEN_SECRET:
    process.env.TOKEN_SECRET || crypto.randomBytes(24).toString("hex"),
  REFRESH_SECRET:
    process.env.REFRESH_SECRET || crypto.randomBytes(24).toString("hex"),
  TOKEN_EXP: 60 * 60 * 1000,
  SESSION_COOKIE_NAME: process.env.TOKEN_COOKIE_NAME ?? "COOKIE",
};
