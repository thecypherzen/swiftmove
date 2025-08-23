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
const HourInSecs = 60 * 60;

export default {
  OP_ENV: process.env.NODE_ENV || "dev",
  SERVER_PORT: process.env.SERVER_PORT,
  SERVER_HOST: process.env.SERVER_HOST,
  DB_URI: process.env.DB_URI as string,
  DB_NAME: process.env.DB_NAME as string,
  TOKEN_SECRET:
    process.env.TOKEN_SECRET || crypto.randomBytes(32).toString("hex"),
  REFRESH_SECRET:
    process.env.REFRESH_SECRET || crypto.randomBytes(32).toString("hex"),
  ACCESS_TOKEN_EXP_SECS: HourInSecs,
  REFRESH_TOKEN_EXP_SECS: HourInSecs * 24,
  ACCESS_COOKIE_NAME: process.env.ACCESS_COOKIE_NAME ?? "aCOOKIE",
  REFRESH_COOKIE_NAME: process.env.REFRESH_COOKIE_NAME ?? "rCOOKIE",
};
