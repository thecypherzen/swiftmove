import { stringify } from "querystring";

export const errors: ServerErrorsType = {
  auth: {
    default: {
      errno: "20",
      desc: "Unauthorised",
      meaning: "Authentication not passed",
      statusCode: 401,
    },
    "20": {
      errno: "20",
      desc: "",
      statusCode: 401,
      meaning: "Authentication not passed",
    },
  },
  validation: {
    default: {
      errno: "31",
      desc: "Invalid Data",
      statusCode: 400,
      meaning: "Data sent not in expected format",
    },
    "31": {
      errno: "31",
      desc: "Invalid Data",
      statusCode: 400,
      meaning: "Data sent not in expected format",
    },
    "32": {
      errno: "32",
      desc: "No data sent",
      statusCode: 400,
      meaning: "Data expected but none sent in request",
    },
    "33": {
      errno: "32",
      desc: "Reques rejected",
      statusCode: 409,
      meaning: "Resource already exists",
    },
  },
  server: {
    default: {
      errno: "50",
      desc: "Internal Server Error",
      statusCode: 500,
      meaning: "Generic, random or uncovered server error",
    },
    "50": {
      errno: "50",
      desc: "Internal Server Error",
      statusCode: 500,
      meaning: "Generic, random or uncovered server error",
    },
    "52": {
      errno: "52",
      desc: "Internal Server Error",
      statusCode: 500,
      meaning: "Database client connection related error",
    },
    "53": {
      errno: "53",
      desc: "Internal Server Error",
      statusCode: 500,
      meaning: "Database operation failed",
    },
    "54": {
      errno: "53",
      desc: "Inernal Server Error",
      statusCode: 500,
      meaning: "Database query failed",
    },
    "55": {
      errno: "53",
      desc: "Inernal Server Error",
      statusCode: 5,
      meaning: "",
    },
  },
  success: {
    default: {
      errno: "0",
      desc: "Successful",
      statusCode: 200,
      meaning: "",
    },
    "0": {
      errno: "0",
      desc: "Successful",
      statusCode: 200,
      meaning: "Operation successfully executed",
    },
    "01": {
      errno: "01",
      desc: "Created",
      statusCode: 201,
      meaning: "New resource creation was successful",
    },
  },
};

export default errors;
export type ServerErrorCodeType = "auth" | "server" | "success" | "validation";

export type ErrorNumberType = {
  errno: string;
  desc: string;
  statusCode: number;
  meaning: string;
};
export type ServerErrorsType = {
  [key in ServerErrorCodeType]: {
    default: ErrorNumberType;
    [key: string]: ErrorNumberType;
  };
};
