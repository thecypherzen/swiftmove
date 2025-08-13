import { BaseController } from "./BaseController.js";
import { type Request, type Response } from "express";
import db, { DBModelNameType } from "../../../db/Database.js";
import { ServerError } from "../lib/ServerError.js";
import passwords from "../lib/passwords.js";

class AuthController extends BaseController {
  #Model: DBModelNameType = "User";
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
      const { success, result } = await passwords.hash(data.password);
      if (!success) {
        throw new ServerError({
          message: "Password hashing failed",
          errno: "55",
          cause: ServerError.constructErrorCause(result as ServerError),
        });
      }
      if (result !== user.password) {
        return this.sendJSON(res, { errno: "22", type: "auth" });
      }
      // create token

      this.sendJSON(res, {
        type: "success",
        errno: "01",
      });
    } catch (err: any) {
      return this.sendJSON(res, {
        type: "server",
        data: [{ error: JSON.stringify(err, ServerError.SerialiseFn, 2) }],
      });
    }
  };

  //async createNewSession (): Promise<void> => {

  //}
}

export default AuthController;
