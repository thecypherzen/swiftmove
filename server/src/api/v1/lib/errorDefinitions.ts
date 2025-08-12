import { stringify } from "querystring";
import { isArray } from "util";

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

export class ServerError extends Error {
  errno: string = "50";
  #name: string;

  constructor({ message, errno = "50", cause }: ServerErrorPropsType) {
    super(message, { cause });
    this.errno = errno;
    this.#name = "ServerError";
  }
  /**
   * Creates a server error cause from an error object.
   * Expects to be called only when the object is a native or
   * derrived type of the Error object.
   * @param {Object} err Some native or derrived Error object
   * @returns {ServerErrorCauseType} The cause of the error
   * @throws {ServerError} - If type of object passed is not a native or
   * derrived Error object.
   */
  static constructErrorCause<T extends ServerError>(
    err: T
  ): ServerErrorCauseType {
    if (!(err instanceof Error)) {
      throw new ServerError({
        message: `Native or derrived Error expected but got ${typeof err}`,
      });
    }
    const c: Record<string, any> = {
      name: err?.name ?? "Error",
      message: err.message,
      stack: err.stack,
    };
    if (err.errno) {
      c.errno = err.errno;
    }
    return c as ServerErrorCauseType;
  }

  get name() {
    return this.#name;
  }
  /**
   * Replace function for Object Serialisation
   * @function #SerialiseFn
   * @param {string} key current key of object in iteration
   * @param {value} value current value of object in iteration
   * @returns
   */
  #SerialiseFn(key: string, value: any) {
    if (value instanceof ServerError) {
      const obj: Record<string, any> = {};
      const indexedError: { [key: string]: any } = value;
      Object.getOwnPropertyNames(value).forEach((prop) => {
        obj[prop] = indexedError[prop];
      });
      obj.stack = value.stack;
      obj.cause = value.cause;
      return obj;
    }
    return value;
  }
  stringify(): string {
    return JSON.stringify(this, this.#SerialiseFn, 2);
  }
}

export type ServerErrorCauseType = {
  name: string;
  message: string;
  errno?: string;
  stack?: string;
};
export type ServerErrorPropsType = {
  message: string;
  errno?: string;
  cause?: ServerErrorCauseType;
};
export default errors;
export type ServerErrorCodeType = "auth" | "server" | "success" | "validation";
export type ServerErrorType = ServerError;
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
