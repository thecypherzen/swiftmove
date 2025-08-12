import { BaseController } from "./BaseController.js";
import { type Request, type Response } from "express";
import db from "../../../db/Database.js";

class AuthController extends BaseController {
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
    if (!data) return;
    try {
      const newUser = await db.create("User", data);
      console.log("[AUTHCONTROLER] CREATED USER", newUser);
      // send created data
      this.json(res, {
        type: "success",
        errno: "01",
        data: [
          {
            id: `${Date.now()}`,
            role: data?.role ?? "user",
            email: data?.email ?? "testUser@email.co",
            termsAccepted: data?.termsAccepted,
          },
        ],
      });
    } catch (err) {
      res.json({ error: "error" });
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
    const data = req.body;
    this.json(res, {
      type: "success",
      errno: "01",
    });
  };
}

export default AuthController;
