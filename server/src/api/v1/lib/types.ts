import type { ServerErrorCodeType } from "./ErrorNumbers.js";
import type { ServerErrorType } from "./ServerError.js";

export type UserRoleType = "admin" | "user" | "driver";

export type UserType = {
  id: string;
  firstName?: string;
  lastname?: string;
  email: string;
  password: string;
  termsAccepted: boolean;
  avatar?: string;
  phoneNumber?: string;
  role: UserRoleType;
  [key: string]: any;
};

export { ServerErrorType, ServerErrorCodeType };
