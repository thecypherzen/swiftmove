import { stringify } from "querystring";

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
      desc: "Invalid Data",
      statusCode: 400,
    },
    "31": {
      errno: "31",
      desc: "Invalid Data",
      statusCode: 400,
    },
    "32": {
      errno: "32",
      desc: "No data sent",
      statusCode: 400,
    },
  },
  server: {
    default: {
      errno: "51",
      desc: "Internal Server Error",
      statusCode: 500,
    },
    "51": {
      errno: "51",
      desc: "Internal Server Error",
      statusCode: 500,
    },
    "52": {
      errno: "52",
      desc: "Internal Server Error",
      statusCode: 500,
    },
    "53": {
      errno: "53",
      desc: "Internal Server Error",
      statusCode: 500,
    },
    "54": {
      errno: "53",
      desc: "Inernal Server Error",
      statusCode: 500,
    },
  },
  success: {
    default: {
      errno: "0",
      desc: "Successful",
      statusCode: 200,
    },
    "0": {
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

export class ServerError extends Error {
  errno?: string = "51";
  #name: string;

  constructor({ message, errno = "51", cause }: ServerErrorPropsType) {
    super(message, { cause });
    this.errno = errno;
    this.#name = "ServerError";
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
};
export type ServerErrorsType = {
  [key in ServerErrorCodeType]: {
    default: ErrorNumberType;
    [key: string]: ErrorNumberType;
  };
};
