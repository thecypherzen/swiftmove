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

  json(res: Response, options: ServerResOptionsType): void {
    const type = options.type;
    const key = options?.errno ?? "default";
    const errno = Errors[type][key].errno;
    const data = options?.data ?? [];
    const statusCode = Errors[type][key].statusCode;
    const status = options.type === "success" ? "success" : "error";
    const resData: ServerResPayloadType = {
      status,
      errno,
      data,
    };
    res.status(statusCode).json(resData);
    return;
  }
}

export type ServerResOptionsType = {
  type: ServerErrorCodeType;
  errno?: number;
  data?: ServerResDataType;
};

export type ServerResDataType = Array<
  ServerErrorCauseType | Record<string, any>
>;

export type ServerResPayloadType = {
  status: "success" | "error";
  errno: number;
  data: ServerResDataType;
};
