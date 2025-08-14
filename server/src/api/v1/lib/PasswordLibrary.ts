import { argon2id, hash, verify } from "argon2";
import { ServerError } from "./ServerError.js";

/**
 * The Passwords Library
 *
 * Contains definitions for passwords hashing and verification
 * functions. Currently supports only argon2 but can be extended
 * to support various algorithms.
 *
 * Exposed as a default export
 */

export default {
  /**
   * Hashes a password using argon2id algorithm
   * @function hash
   * @param {string} password - the original password to hash
   * @returns {Promise<PasswordsResType>} - a promise that resolves into
   * standardised libary response object.
   */
  hash: async (password: string): Promise<PasswordsResType> => {
    try {
      const passwordHash = await hash(password, {
        type: argon2id,
        memoryCost: 15360,
        parallelism: 2,
        timeCost: 3,
      });
      return { success: true, result: passwordHash };
    } catch (err: any) {
      return { success: false, result: err };
    }
  },
  /**
   * Verifies a password string against an argon2id password string
   * @function verify
   * @param {string} hash - the argon2id hash
   * @param {string} password - the password string
   * @returns {Promise<PasswordsResType>} - a promise that resolves into
   * standardised libary response object.
   */
  verify: async (hash: string, password: string): Promise<PasswordsResType> => {
    try {
      const matches = await verify(hash, password);
      return { success: true, result: matches };
    } catch (err: any) {
      return { success: false, result: err };
    }
  },
};

type PasswordsResType = {
  success: boolean;
  result: string | boolean | ServerError;
};
