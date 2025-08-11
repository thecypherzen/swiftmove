import { type Response, type Request } from "express";
import {
  ServerErrorCauseType,
  ServerErrorCodeType,
} from "../lib/errorDefinitions.js";
import Errors from "../lib/errorDefinitions.js";
import config from "../../../config.js";

export class BaseController {
  #name = "BaseController";

  constructor() {
    if (this.constructor === BaseController) {
      throw new Error(`Cannot instantiate ${this.#name} directly`);
    }
  }
  #getPayload(
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
    };
    return { payload, status: statusCode };
  }

  public json(res: Response, options: ServerResOptionsType): void {
    const { status, payload } = this.#getPayload(res, options);
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
  payload: ServerResDataType;
};
