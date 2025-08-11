import { type Response, type Request } from "express";
import {
  ServerErrorCauseType,
  ServerErrorCodeType,
} from "../lib/errorDefinitions.js";
import Errors from "../lib/errorDefinitions.js";
import config from "../../../config.js";
import { matchedData, validationResult } from "express-validator";

export class BaseController {
  #name = "BaseController";

  constructor() {
    if (this.constructor === BaseController) {
      throw new Error(`Cannot instantiate ${this.#name} directly`);
    }
  }
  /**
   * @private @function getPayload - Constructs the payload from a res object
   * Ensures consistency in server response body for all requests
   * @typedef {Object} ServerPayloadType
   * @typedef {Object} ServerResOptionsType - Standard options sent
   * @param {Express.Response} res - Response object
   * @param {ServerResOptionsType} options - Options received
   * @returns {ServerPayloadType}
   */
  protected getPayload(
    res: Response,
    options: ServerResOptionsType
  ): { status: number; payload: ServerResPayloadType } {
    const type = options.type;
    const key = options?.errno ?? "default";
    const errno = Errors[type][key].errno;
    const data = options?.data ?? [];
    const statusCode = Errors[type][key].statusCode;
    const status = options.type === "success" ? "success" : "error";
    const desc = Errors[type][key].desc;
    const payload: ServerResPayloadType = {
      status,
      errno,
      payload: data,
      desc,
      count: data.length,
    };
    return { payload, status: statusCode };
  }
  /**
   *
   * @param req
   */
  getValidatedData(req: Request, res: Response) {
    const validation = validationResult(req);
    if (!validation.isEmpty()) {
      const validationErrors = validation.array();
      const { status, payload } = this.getPayload(res, {
        type: "validation",
        data: validationErrors,
      });
      console.log("VALIDATION ERRORS", validationErrors);
      res.status(status).json(payload);
      return null;
    }
    const data = matchedData(req);
    if (!data.keys.length) {
      this.json(res, {
        type: "validation",
        errno: "32",
      });
      return null;
    }
    return matchedData(req);
  }

  /**
   * Sends a json payload to requesting client
   * @public @method json
   * @param {Express.Response} res - the response object
   * @param {ServerResOptionsType} options - options received
   * @returns {void}
   */
  public json(res: Response, options: ServerResOptionsType): void {
    const { status, payload } = this.getPayload(res, options);
    res.status(status).json(payload);
    return;
  }
}

export type ServerResOptionsType = {
  type: ServerErrorCodeType;
  errno?: string;
  data?: ServerResDataType;
};

export type ServerResDataType = Array<
  ServerErrorCauseType | Record<string, any>
>;

export type ServerResPayloadType = {
  status: "success" | "error";
  errno: string;
  desc: string;
  count: number;
  payload: ServerResDataType;
};
