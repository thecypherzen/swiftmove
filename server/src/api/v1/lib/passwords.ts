import { argon2id, hash, verify } from "argon2";
import { ServerError } from "./ServerError.js";

export default {
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
