export const errors: ServerErrorsType = {
  auth: {
    default: {
      errno: 2,
      desc: "Unauthorised",
      statusCode: 401,
    },
    "2": {
      errno: 2,
      desc: "",
      statusCode: 401,
    },
  },
  validation: {
    default: {
      errno: 31,
      desc: "Error",
      statusCode: 400,
    },
  },
  server: {
    default: {
      errno: 51,
      desc: "Internal Server Error",
      statusCode: 500,
    },
  },
  success: {
    default: {
      errno: 0,
      desc: "Operation successful",
      statusCode: 200,
    },
  },
};

class ServerError extends Error {
  errno: number;

  constructor(
    message: string,
    errno: number = -1,
    cause: ServerErrorCauseType
  ) {
    super(message, { cause });
    this.errno = errno;
  }
}

export type ServerErrorCauseType = {
  name: string;
  message: string;
  errno?: number;
  stack?: string;
};

export default errors;
export type ServerErrorCodeType = "auth" | "server" | "success" | "validation";
export type ServerErrorType = ServerError;
export type ErrorNumberType = {
  errno: number;
  desc: string;
  statusCode: number;
};
export type ServerErrorsType = {
  [key in ServerErrorCodeType]: {
    default: ErrorNumberType;
    [key: string]: ErrorNumberType;
  };
};
