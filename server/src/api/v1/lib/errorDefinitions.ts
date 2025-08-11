export const errors: ServerErrorsType = {
  auth: {
    default: {
      errno: "20",
      desc: "Unauthorised",
      statusCode: 401,
    },
    "20": {
      errno: "20",
      desc: "",
      statusCode: 401,
    },
  },
  validation: {
    default: {
      errno: "31",
      desc: "Error",
      statusCode: 400,
    },
  },
  server: {
    default: {
      errno: "51",
      desc: "Internal Server Error",
      statusCode: 500,
    },
  },
  success: {
    default: {
      errno: "0",
      desc: "Successful",
      statusCode: 200,
    },
    "01": {
      errno: "01",
      desc: "Created",
      statusCode: 201,
    },
  },
};

class ServerError extends Error {
  errno: string;

  constructor(
    message: string,
    errno: string = "10",
    cause: ServerErrorCauseType
  ) {
    super(message, { cause });
    this.errno = errno;
  }
}

export type ServerErrorCauseType = {
  name: string;
  message: string;
  errno?: string;
  stack?: string;
};

export default errors;
export type ServerErrorCodeType = "auth" | "server" | "success" | "validation";
export type ServerErrorType = ServerError;
export type ErrorNumberType = {
  errno: string;
  desc: string;
  statusCode: number;
};
export type ServerErrorsType = {
  [key in ServerErrorCodeType]: {
    default: ErrorNumberType;
    [key: string]: ErrorNumberType;
  };
};
