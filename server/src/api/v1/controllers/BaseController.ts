import { type Response, type Request } from "express";
import Errors, { type ServerErrorCodeType } from "../lib/ErrorNumbers.js";
import config from "../../../config.js";
import { matchedData, validationResult } from "express-validator";

export class BaseController {
  #name = "BaseController";

  constructor() {
    if (this.constructor === BaseController) {
      throw new Error(`Cannot instantiate ${this.#name} directly`);
    }
  }
  get name() {
    return this.#name;
  }
  /**
   * @private @function getPayload - Constructs the payload from a res object
   * Ensures consistency in server response body for all requests
   * @typedef {Object} ServerPayloadType
   * @typedef {Object} ServerResOptionsType - Standard options sent
   * @param {ServerResOptionsType} options - Options received
   * @returns {ServerPayloadType}
   */
  protected getPayload(options: ServerResOptionsType): {
    status: number;
    payload: ServerResPayloadType;
  } {
    const type = options.type;
    const key = options?.errno ?? "default";
    const errno = Errors[type][key].errno;
    const isError = options?.type !== "success";
    const statusCode = Errors[type][key].statusCode;
    const status = isError ? "error" : "success";
    const desc = isError
      ? Errors[type][key].desc
      : (options?.desc ?? Errors[type][key].desc);
    const tmp: Record<string, any> = { status, errno, desc };
    if (isError) {
      if (config.OP_ENV === "dev" && options.data) {
        tmp.payload = options.data;
        tmp.count = options.data.length;
      }
    } else {
      if (options.data !== undefined) {
        tmp.payload = options.data;
        tmp.count = options.data.length;
      }
    }
    return { payload: tmp as ServerResPayloadType, status: statusCode };
  }
  /**
   * Extracts validated data from request object as per
   * validator middleware. Expects the middleware to have been mounted
   * @method getValidatedData
   * @param {Express.Request} req - the request object
   * @param {Express.Response} res - the response object
   * @returns {Object | null} - validated data object on success
   * or null otherwise, either due to validation failure or empty data set
   * In either case, the appropriate response is sent to client and the
   * calling function has to only return
   */
  getValidatedData(req: Request, res: Response) {
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
      const validationErrors = validation.array();
      const { status, payload } = this.getPayload({
        type: "validation",
        data: validationErrors,
      });
      res.status(status).json(payload);
      return null;
    }
    const data = matchedData(req);
    if (!Object.keys(data).length) {
      this.sendJSON(res, {
        type: "validation",
        errno: "32",
      });
      return null;
    }
    return data;
  }

  /**
   * Sends a json payload to requesting client
   * @public @method json
   * @param {Express.Response} res - the response object
   * @param {ServerResOptionsType} options - options received
   * @returns {void}
   */
  public sendJSON(res: Response, options: ServerResOptionsType): void {
    const { status, payload } = this.getPayload(options);
    res.status(status).json(payload);
    return;
  }
}

/**
 * Types
 */
export type ServerResOptionsType = {
  type: ServerErrorCodeType;
  errno?: string;
  data?: ServerResDataType;
  desc?: string;
};

export type ServerResDataType = Array<{ error: string } | Record<string, any>>;

export type ServerResPayloadType = {
  status: "success" | "error";
  errno: string;
  desc: string;
  count: number;
  payload?: ServerResDataType;
};
