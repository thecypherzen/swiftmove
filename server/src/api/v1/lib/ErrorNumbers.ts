import { stringify } from "querystring";

export const errors: ServerErrorsType = {
  auth: {
    default: {
      errno: "20",
      desc: "Denied",
      meaning: "Authentication failed for some reason",
      statusCode: 401,
    },
    "20": {
      errno: "20",
      desc: "Denied",
      statusCode: 401,
      meaning: "Authentication failed for some reason",
    },
    "21": {
      errno: "21",
      desc: "Forbidden",
      statusCode: 403,
      meaning: "User account type doen't match expectation",
    },
    "22": {
      errno: "22",
      desc: "Forbidden",
      statusCode: 403,
      meaning: "Passwords don't match",
    },
    "23": {
      errno: "23",
      desc: "Denied",
      statusCode: 401,
      meaning: "User not logged in but login is required",
    },
    "24": {
      errno: "24",
      desc: "Denied",
      statusCode: 403,
      meaning: "User already logged in",
    },
    "25": {
      errno: "25",
      desc: "Denied",
      statusCode: 403,
      meaning: "Session expired",
    },
    "26": {
      errno: "26",
      desc: "Not Allowed",
      statusCode: 405,
      meaning: "Not allowed. Tokens expected but credentials sent",
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
      errno: "33",
      desc: "Rejected",
      statusCode: 409,
      meaning: "Resource already exists",
    },
    "34": {
      errno: "34",
      desc: "Failed",
      statusCode: 404,
      meaning: "Requested resource not found",
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
      errno: "55",
      desc: "Internal Server Error",
      statusCode: 500,
      meaning: "JWT signing or verification failure",
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
