import type {
  ServerErrorType,
  ServerErrorCodeType,
} from "./errorDefinitions.js";

type UserDataType = {
  email: string;
  role: string;
  password: string;
  termsAccepted: boolean;
};
export { ServerErrorType, ServerErrorCodeType };
