import { BaseController } from "./BaseController.js";
import { NextFunction, type Request, type Response } from "express";
import db from "../../../db/Database.js";
import { ServerError } from "../lib/ServerError.js";
import passwords from "../lib/PasswordLibrary.js";
import {
  generateToken,
  decomposeToken,
  type TokenPayloadType,
  TokenType,
} from "../lib/TokensLibrary.js";
import type { UserRoleType, UserType } from "../lib/types.js";
import config from "../../../config.js";
import { UserSchemaObjectType } from "../../../db/schemas/UserSchema.js";
import { User, type UserModelType } from "../../../db/models/index.js";

class AuthController extends BaseController {
  #name: string;
  #model: UserModelType;
  #ATokenExpTimeSecs: number = config.ACCESS_TOKEN_EXP_SECS;
  #RTokenExpTimeSecs: number = config.REFRESH_TOKEN_EXP_SECS;
  #ACookieName: string = config.ACCESS_COOKIE_NAME;
  #RCookieName: string = config.REFRESH_COOKIE_NAME;
  #GenerateToken = generateToken;
  #DecomposeToken = decomposeToken;
  constructor() {
    super();
    this.#name = "AuthController";
    this.#model = User;
  }

  get name() {
    return this.#name;
  }
  get model() {
    return this.#model;
  }
  get Middlewares() {
    return this.#middlewares;
  }
  #middlewares = {
    /**
     * Middleware that sets login requirement to true. Used to protect routes
     * that require authentication
     * @function requireLogin
     * @param {Express.Request} req - the request object
     * @param { Express.NextFunction} next - the next middleware caller
     * @return {void} - passes control to the next middleware instead
     */
    requireLogin: (req: Request, _: Response, next: NextFunction): void => {
      this.#setLoginRequired(req, true);
      next();
    },
    /**
     * Middleware that sets login requirement to false.
     * Used to ease auth by token requirement
     * @function unRequireLogin
     * @param {Express.Request} req - the request object
     * @param {Express.NextFunction} next - the next middleware caller
     * @return {void} - passes control to the next middleware instead
     */
    unRequireLogin: (req: Request, _: Response, next: NextFunction): void => {
      this.#setLoginRequired(req, false);
      next();
    },
    /**
     * Middleware that allows credentials to be used for auth.
     * Eases requirement and calls next
     * @function allowCredentials
     * @param {Express.Request} req - the request object
     * @param { Express.NextFunction} next - the next middleware caller
     * @return {void} - passes control to the next middleware instead
     */
    allowCredentials: (req: Request, _: Response, next: NextFunction): void => {
      this.#setAllowCredentials(req, true);
      next();
    },
    /**
     * Middleware that denies use of credentials for auth
     * @function denyCredentials
     * @param {Express.Request} req - the request object
     * @param { Express.NextFunction} next - the next middleware caller
     * @return {void} - passes control to the next middleware instead
     */
    denyCredentials: (req: Request, _: Response, next: NextFunction): void => {
      this.#setAllowCredentials(req, false);
      next();
    },

    restrictAccess: (allowed: UserRoleType[]) => {
      return async (req: Request, res: Response, next: NextFunction) => {
        if (!req.body?.auth?.payload) {
          this.sendJSON(res, { type: "auth", errno: "23" });
          return;
        }
        const { email, role, id } = req.body.auth.payload;
        const user = await db.getOne(this.model, {
          _id: id,
          role,
          email,
        });
        if (!user) {
          this.sendJSON(res, { type: "auth", errno: "23" });
          return;
        }
        if (!allowed.includes(user.role)) {
          this.sendJSON(res, { type: "auth", errno: "21" });
          return;
        }
        next();
      };
    },
    /**
     * Middleware that validates requesting user's login status
     * - Ensures that login status is known and assured through the
     * request cycle.
     * - Disallows use of credentials if user session is still active
     * - Passes control to next middleware afterwards
     * @param {Express.Request} req - the request object
     * @param {Express.Response} _ - the response object
     * @param {Express.NextFunction} next - the next middleware caller
     * @returns {Promise<void>} - A promise that resolves to void.
     */
    validateLoginStatus: async (
      req: Request,
      _: Response,
      next: NextFunction
    ): Promise<void> => {
      const aToken: string | undefined = req.cookies[this.#ACookieName];
      // handle expired auth token
      if (!aToken) {
        this.#setLoginStatus(req, false);
        // deny credentials use if session is active
        if (req.cookies[this.#RCookieName]) {
          this.#setAllowCredentials(req, false);
        }
      } else {
        // confirm user is logged in
        this.#setLoginStatus(req, true);
      }
      next();
    },

    validateIsLoggedIn: async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      if (this.#isLoggedIn(req)) {
        next();
      } else {
        this.sendJSON(res, { type: "auth", errno: "23" });
      }
      return;
    },
    /**
     * Middleware that validates requresting user's tokens
     * - If access token is **not expired**, it extracts and saves the payload for next middleware
     * - If access token is **expired** and:
     *     - session is *active*: it renews the token if session's **exp time** > **token's validity**.
     *     - if session's **exp time** < **token validity**, it clears the
     * session, denies the request and returns.
     *     - session is *expired* and credentials are *not allowed*,: it denies the request and returns. Otherwise, it passes control to the next middleware
     * - Throws ServerError if token verifications or signing fail at any point
     * @param {Express.Request} req - the request object
     * @param {Express.Response} res - the response object
     * @param {Express.NextFunction} next - the next middleware caller
     * @returns {Promise<void>} - A promise that resolves to void.
     * @throws {ServerError} - In even that token verifications fail. In such
     * case, a server error response is sent to the client.
     */
    validateSession: async (
      req: Request,
      res: Response,
      next: NextFunction
    ): Promise<void> => {
      const aToken: string = req.cookies[this.#ACookieName];
      const rToken: string = req.cookies[this.#RCookieName];
      try {
        if (aToken) {
          const { success, data, error } = await this.decomposeToken(
            aToken,
            "access"
          );
          if (!success) throw error;
          if (data) {
            req.body.auth.payload = data;
            next();
            return;
          }
        }
        // refresh access token
        if (rToken) {
          const { success, data, error } = await this.refreshAccessToken(
            res,
            rToken
          );
          if (!success && error) throw error; // error occured
          // seession expired
          if (!data) {
            this.sendJSON(res, { type: "auth", errno: "25" });
            return;
          }
          const { data: dt } = await this.decomposeToken(data, "access");
          req.body.auth.payload = dt;
          //this.#setLoginStatus(req, true);
          next();
          return;
        }
        if (!this.credentialsAllowed(req)) {
          this.sendJSON(res, { type: "auth", errno: "23" });
          return;
        }
        next();
      } catch (err: any) {
        // handle errors
        this.sendJSON(res, {
          type: "server",
          data: [{ error: JSON.stringify(err, ServerError.SerialiseFn, 2) }],
        });
        return;
      }
    },
  };

  /**
   * Clears user's session
   * @private @method #clearSession
   * @param {Express.Response} res - the response object to clear.
   * @returns {void}
   */
  #clearSession = (res: Response): void => {
    res.clearCookie(this.#ACookieName);
    res.clearCookie(this.#RCookieName);
  };

  #isLoggedIn = (req: Request): boolean => {
    return req.body.auth.isLoggedIn;
  };

  /**
   * Allows credentials to be used for auth.
   * @private @method #setAllowCredentials
   * @param {Express.Request} req - the request object
   * @param {boolean} status - the new status. Defaults to false
   * @return {void} - passes control to the next middleware instead
   */
  #setAllowCredentials = (req: Request, status: boolean = false) => {
    req.body.auth.allowCredentials = status;
  };

  /**
   * Sets Login requirement to given boolean value
   * @private @method #setLoginRequired
   * @param {Express.Request} req - the request object
   * @param {boolean} value - the value to set
   * @returns {void}
   */
  #setLoginRequired = (req: Request, value: boolean = true) => {
    req.body.auth.requireLogin = value;
  };

  /**
   * Sets user's login status to the given boolean
   * @private @method #setLoginStatus
   * @param {Express.Request} req - the request object
   * @param {boolean} status - the new status. Defaults to false
   * @return {void} - passes control to the next middleware instead
   */
  #setLoginStatus = (req: Request, status: boolean = false) => {
    req.body.auth.isLoggedIn = status;
  };

  /**
   * Create a new User
   * Gracefully handles validation errors.
   * @method create
   * @param {Express.Request} req - incoming request
   * @param {Express.Response} res - outgoing response
   * @returns {Promise<void>} - Promise that resolves to void
   */
  createUser = async (req: Request, res: Response): Promise<void> => {
    const data = this.getValidatedData(req, res);
    if (!data) return; // response already sent by getValidatedData
    try {
      // verify user doesn't exist
      const alreadyExists = await db.exists(this.model, { email: data.email });
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
      const _ = await db.create(this.model, {
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
        maxAge: this.#ATokenExpTimeSecs * 1000,
      });
      // set refresh cookie
      res.cookie(this.#RCookieName as string, rToken, {
        httpOnly: true,
        maxAge: this.#RTokenExpTimeSecs * 1000,
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
   * Checks if credentials are allowed on request
   * @method credentialsAllowed
   * @param {Express.Request} req - the request object
   * @returns {boolean}
   */
  credentialsAllowed = (req: Request): boolean => {
    return req.body?.auth?.allowCredentials === true;
  };

  /**
   * Verifies a jwt payload, extracting its payload.
   * @method decomposeToken
   * @param {string} token - The jwt to verify
   * @param {TokenType} type - Role of jwt being verified.
   * @returns {Promise<DcTokenResType>} - A promise that resolves into
   * an object with all the info we need
   */
  decomposeToken = async (
    token: string,
    type: TokenType = "access"
  ): Promise<DcTokenResType> => {
    try {
      const { payload } = this.#DecomposeToken(token, type);
      return { success: true, data: payload };
    } catch (err: any) {
      return { success: false, data: null, error: err };
    }
  };

  /**
   * Creates a new JWT given a paload.
   * @method getNewToken
   * @param {TokenPayloadType} payload - The payload to encode into jwt
   * @returns {Promise<string>} - A promise that resolves into the token
   */
  getNewToken = async (
    payload: TokenPayloadType,
    type: TokenType = "access"
  ): Promise<string> => {
    const iat = Math.floor(Date.now() / 1000);
    const times = {
      iat,
      exp:
        iat +
        (type == "access" ? this.#ATokenExpTimeSecs : this.#RTokenExpTimeSecs),
    } as Record<string, any>;
    return this.#GenerateToken({ ...times, ...payload }, type);
  };
  /**
   * Gets the user's current login state
   * @method isLoggedIn
   * @param { Express.Request } req  - the request object
   * @returns {void}
   */
  isLoggedIn = (req: Request) => {
    return req.body.auth.isLoggedIn;
  };

  /**
   * Logs a user into the application
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
    try {
      // use tokens if available
      const d: TokenPayloadType | undefined = req.body?.auth?.payload;
      let user;
      const data = this.getValidatedData(req, res);
      if (d) {
        user = await db.getOne(this.model, { email: d.email, _id: d.id });
      } else {
        if (!this.credentialsAllowed(req)) {
          return this.sendJSON(res, { errno: "26", type: "auth" });
        }
        // validate sent data
        if (!data) return;
        // get user by email
        user = await db.getOne(this.model, { email: data.email });
      }
      if (!user) {
        return this.sendJSON(res, { errno: "34", type: "validation" });
      }
      // validate account types match
      if (user.role !== (data as Record<string, any>).role) {
        return this.sendJSON(res, { errno: "21", type: "auth" });
      }
      // validate password matches
      const { success, result } = await passwords.verify(
        user.password,
        (data as Record<string, any>).password
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
      // Start new session for user if using credentials
      const profile = user.toObject() as unknown as UserSchemaObjectType;
      if (this.credentialsAllowed(req)) {
        const isSet = await this.createNewSession(res, {
          id: profile.id,
          email: profile.email,
          role: profile.role,
        });
        if (!isSet) return;
      }
      this.sendJSON(res, { type: "success", data: [profile] });
    } catch (err: any) {
      return this.sendJSON(res, {
        type: "server",
        data: [{ error: JSON.stringify(err, ServerError.SerialiseFn, 2) }],
      });
    }
  };
  /**
   * Refreshes an expired access token
   * @typedef TokenRefreshRes - Token refresh result type
   * @property {boolean} success
   * @optional @property {ServerError} error - error object on error
   * @property {string | null} data - the refreshed token on success
   * or null on error or expiration.
   *
   * @method refreshAccessToken
   * @param {Express.Request} res - the response object
   * @param {string} rToken - the refresh token to use
   * @return {void} - passes control to the next middleware instead
   */
  refreshAccessToken = async (
    res: Response,
    rToken: string
  ): Promise<{
    success: boolean;
    error?: ServerError;
    data: string | null;
  }> => {
    const { success, data, error } = await this.decomposeToken(
      rToken,
      "refresh"
    );
    if (!success) return { success, error, data: null };
    if (!data) {
      this.#clearSession(res);
      return { success: false, data: null };
    }
    // clear session if exp time is < token validity
    if ((data.exp as number) <= this.#ATokenExpTimeSecs) {
      this.#clearSession(res);
      return { success: false, data: null };
    }
    // refresh access token
    const { iat, exp, ...rest } = data;
    const newAToken = await this.getNewToken(rest);
    res.cookie(this.#ACookieName, newAToken, {
      httpOnly: true,
      maxAge: this.#ATokenExpTimeSecs * 1000,
    });
    return { success: true, data: newAToken };
  };
}

// types
export type DcTokenResType = {
  success: boolean;
  data: TokenPayloadType | null;
  error?: ServerError;
};

export default AuthController;
