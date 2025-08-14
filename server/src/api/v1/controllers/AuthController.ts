import { BaseController } from "./BaseController.js";
import { NextFunction, type Request, type Response } from "express";
import db, { DBModelNameType } from "../../../db/Database.js";
import { ServerError } from "../lib/ServerError.js";
import passwords from "../lib/PasswordLibrary.js";
import {
  generateToken,
  decomposeToken,
  type TokenPayloadType,
  TokenType,
} from "../lib/TokensLibrary.js";
import type { UserType } from "../lib/types.js";
import config from "../../../config.js";
import { UserSchemaObjectType } from "../../../db/schemas/UserSchema.js";

class AuthController extends BaseController {
  #Model: DBModelNameType = "User";
  #ATokenExpTime: number = config.ACCESS_TOKEN_EXP ?? 20 * 60 * 1000;
  #RTokenExpTime: number = config.REFRESH_TOKEN_EXP ?? 60 * 60 * 1000;
  #ACookieName: string = config.ACCESS_COOKIE_NAME;
  #RCookieName: string = config.REFRESH_COOKIE_NAME;
  #GenerateToken = generateToken;
  #DecomposeToken = decomposeToken;
  constructor() {
    super();
  }

  #Middlewares = {
    requireLogin: (req: Request, _: Response, next: NextFunction) => {
      this.#requireLogin(req);
      next();
    },
    /**
     *
     * @param req
     * @param res
     * @param next
     * @returns
     */
    validateIsLoggedIn: async (
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      const sessionId: string | undefined = req.cookies[this.#ACookieName];
      // no session exists
      if (!sessionId) {
        this.#setLoginStatus(req, false);
        // refresh token exists - means user had logged in before
        // so we deny usage of credentials
        if (req.cookies[this.#RCookieName]) {
          this.#setAllowCredentials(req, false);
        }
        // send error resonse if login is required
        if (req.body.auth.requireLogin) {
          this.sendJSON(res, {
            type: "auth",
            errno: "23",
          });
          return;
        }
      }
      // confirm user is logged in
      this.#setLoginStatus(req, true);
      next();
    },
  };

  #requireLogin = (req: Request) => {
    req.body.auth.requireLogin = true;
  };

  #setAllowCredentials = (req: Request, value: boolean = false) => {
    req.body.auth.allowCredentials = value;
  };

  #setLoginStatus = (req: Request, status: boolean = false) => {
    req.body.auth.isLoggedIn = status;
  };

  /**
   * Create a new User
   * Gracefully handles validation errors.
   * @method create
   * @param {Express.Request} req - incoming request
   * @param {Express.Response} res - outgoing response
   * @returns
   */
  createUser = async (req: Request, res: Response) => {
    const data = this.getValidatedData(req, res);
    if (!data) return; // response already sent by getValidatedData
    try {
      // verify user doesn't exist
      const alreadyExists = await db.exists(this.#Model, { email: data.email });
      if (alreadyExists) {
        this.sendJSON(res, { errno: "33", type: "validation" });
        return;
      }
      // hash user password
      const { success, result } = await passwords.hash(data.password);
      if (!success) {
        throw new ServerError({
          message: "Password hashing failed",
          errno: "55",
          cause: ServerError.constructErrorCause(result as ServerError),
        });
      }
      // proceed to create user
      const _ = await db.create(this.#Model, {
        ...data,
        password: result,
      });
      // send created data
      this.sendJSON(res, {
        type: "success",
      });
    } catch (err: any) {
      this.sendJSON(res, {
        type: "server",
        data: [{ error: JSON.stringify(err, ServerError.SerialiseFn, 2) }],
      });
      return;
    }
  };

  /**
   * Creates a token for given user and starts a new session them
   * @method createNewSession
   * @param {Express.Response} res - The response to set the headers
   * @param {TokenPayloadType} payload - The data to be saved in token
   * @returns { Promise<boolean>} - true if session was set successfully
   * false otherwise. In such case, also sends response to client.
   */
  createNewSession = async (
    res: Response,
    payload: TokenPayloadType
  ): Promise<boolean> => {
    try {
      const aToken = await this.getNewToken(payload);
      const rToken = await this.getNewToken(payload, "refresh");
      // set access cookie
      res.cookie(this.#ACookieName as string, aToken, {
        httpOnly: true,
        maxAge: this.#ATokenExpTime,
      });
      // set refresh cookie
      res.cookie(this.#RCookieName as string, rToken, {
        httpOnly: true,
        maxAge: this.#RTokenExpTime,
      });
      return true;
    } catch (err: any) {
      this.sendJSON(res, {
        type: "server",
        data: [{ error: JSON.stringify(err, ServerError.SerialiseFn, 2) }],
      });
      return false;
    }
  };

  /**
   * Creates a new JWT given a paload.
   * @method getNewToken
   * @param {TokenPayloadType} payload - The payload to encode into jwt
   * @returns {Promise<string>} - A promise that resolves into the token
   */
  getNewToken = async (
    { email, id, role }: TokenPayloadType,
    type: TokenType = "access"
  ): Promise<string> => {
    return this.#GenerateToken({ email, id, role }, type, {
      expiresIn: type == "access" ? this.#ATokenExpTime : this.#RTokenExpTime,
    });
  };

  isLoggedIn = (req: Request) => {
    return req.body.auth.isLoggedIn;
  };

  /**
   * Login a user
   * @method login
   * @param {Express.Request} req - Incoming request
   * @param {Express.Response} res - Outging response
   * @returns {void} - Doesn't return anything
   */
  login = async (req: Request, res: Response) => {
    // handle already logged in status
    if (this.isLoggedIn(req)) {
      this.sendJSON(res, { type: "auth", errno: "24" });
      return;
    }
    // validate sent data
    const data = this.getValidatedData(req, res);
    if (!data) return; // response already sent in getValidatedData
    // validate user exists by email
    try {
      const user = await db.getOne(this.#Model, { email: data.email });
      if (!user) {
        return this.sendJSON(res, { errno: "34", type: "validation" });
      }
      // validate account types match
      if (user.role !== data.role) {
        return this.sendJSON(res, { errno: "21", type: "auth" });
      }
      // validate password matches
      const { success, result } = await passwords.verify(
        user.password,
        data.password
      );
      if (!success) {
        throw new ServerError({
          message: "Password hashing failed",
          errno: "55",
          cause: ServerError.constructErrorCause(result as ServerError),
        });
      }
      if (!result) {
        return this.sendJSON(res, { errno: "22", type: "auth" });
      }
      // validate user not loggedIn
      // Start new session for user
      const { email, id, role } =
        user.toObject() as unknown as UserSchemaObjectType;
      const isSet = await this.createNewSession(res, { id, email, role });
      if (!isSet) return;
      this.sendJSON(res, { type: "success" });
    } catch (err: any) {
      return this.sendJSON(res, {
        type: "server",
        data: [{ error: JSON.stringify(err, ServerError.SerialiseFn, 2) }],
      });
    }
  };
  get Middlewares() {
    return this.#Middlewares;
  }
}

export default AuthController;
