import type { ServerErrorCodeType } from "./ErrorNumbers.js";
import type { ServerErrorType } from "./ServerError.js";

export type UserRoleType = "admin" | "user";
type UserDataType = {
  email: string;
  role: UserRoleType;
  password: string;
  termsAccepted: boolean;
  id: string;
};

export { ServerErrorType, ServerErrorCodeType };
