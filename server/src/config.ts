/**
 * Define constants and default server values
 * Uses doetnev to load environment variables from .env
 */

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
};
