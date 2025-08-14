import { BaseController } from "./BaseController.js";
import { type Request, type Response } from "express";
import db, { DBModelNameType } from "../../../db/Database.js";
import { ServerError } from "../lib/ServerError.js";
import passwords from "../lib/PasswordLibrary.js";
import {
  generateToken,
  decomposeToken,
  type TokenPayloadType,
} from "../lib/TokensLibrary.js";
import type { UserType } from "../lib/types.js";
import config from "../../../config.js";
import { UserSchemaObjectType } from "../../../db/schemas/UserSchema.js";

class AuthController extends BaseController {
  #Model: DBModelNameType = "User";
  #CookieExpTime: number = config.TOKEN_EXP ?? 60 * 60 * 1000;
  #CookieName: string = config.SESSION_COOKIE_NAME;
  #GenerateToken = generateToken;
  #DecomposeToken = decomposeToken;
  constructor() {
    super();
  }
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
   * Login a user
   * @method login
   * @param {Express.Request} req - Incoming request
   * @param {Express.Response} res - Outging response
   * @returns {void} - Doesn't return anything
   */
  login = async (req: Request, res: Response) => {
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
      const token = await this.getNewToken(payload);
      res.cookie(this.#CookieName as string, token, {
        httpOnly: true,
        maxAge: this.#CookieExpTime,
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
  getNewToken = async ({
    email,
    id,
    role,
  }: TokenPayloadType): Promise<string> => {
    return this.#GenerateToken({ email, id, role }, "access");
  };
}

export default AuthController;
