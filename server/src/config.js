"use strict";
/**
 * Define constants and default server values
 * Uses doetnev to load environment variables from .env
 */
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = require("dotenv");
// instantiate config
var conf = (0, dotenv_1.config)();
if (!conf) {
  console.error("env vars failed to load");
} else {
  console.log("env vars loaded successfully");
}
/**
 * Exports
 */
exports.default = {
  OP_ENV: process.env.NODE_ENV || "dev",
  SERVER_PORT: process.env.SERVER_PORT,
  SERVER_HOST: process.env.SERVER_HOST,
  DB_URI: process.env.DB_URI,
  DB_NAME: process.env.DB_NAME,
};
