export class ServerError extends Error {
  errno: string;
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
  static SerialiseFn(key: string, value: any) {
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
    return JSON.stringify(this, ServerError.SerialiseFn, 2);
  }
}
export type ServerErrorType = ServerError;
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
