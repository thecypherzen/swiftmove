import type { ServerErrorCodeType } from "./ErrorNumbers.js";
import type { ServerErrorType } from "./ServerError.js";

type UserDataType = {
  email: string;
  role: string;
  password: string;
  termsAccepted: boolean;
};
export { ServerErrorType, ServerErrorCodeType };
