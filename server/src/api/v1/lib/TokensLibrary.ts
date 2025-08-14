import jwt from "jsonwebtoken";
import config from "../../../config.js";
import { UserRoleType } from "./types.js";
import { ServerError } from "./ServerError.js";

// generate tokens
export const generateToken = (
  payload: TokenPayloadType,
  type: TokenType = "access",
  options: object = {}
): string => {
  const secret =
    type === "access" ? config.TOKEN_SECRET : config.REFRESH_SECRET;
  if (!secret) {
    throw new ServerError({
      message: `${type} secret not defined`,
      errno: "55",
    });
  }
  return jwt.sign(payload, secret, options);
};

// extract payload from token
export const decomposeToken = (
  token: string,
  type: TokenType = "access",
  options: object = {}
): DTokenResType => {
  try {
    const secret =
      type === "access" ? config.TOKEN_SECRET : config.REFRESH_SECRET;
    if (!secret) {
      throw new ServerError({
        message: `${type} secret not defined`,
        errno: "55",
      });
    }
    const payload = jwt.verify(token, secret, options) as TokenPayloadType;
    return { payload };
  } catch (err: any) {
    if (err instanceof jwt.TokenExpiredError) {
      return { payload: null };
    }
    throw new ServerError({
      message: "JWT verification failed",
      errno: "50",
      cause: ServerError.constructErrorCause(err),
    });
  }
};

export type TokenPayloadType = {
  email: string;
  role: UserRoleType;
  id: string;
  iat?: number;
  exp?: number;
};
export type TokenType = "access" | "refresh";
export type DTokenResType = {
  payload: TokenPayloadType | null;
};
