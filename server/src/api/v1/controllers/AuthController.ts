import { BaseController } from "./BaseController.js";
import { type Request, type Response } from "express";

class AuthController extends BaseController {
  constructor() {
    super();
  }

  create = async (req: Request, res: Response) => {
    const data = this.getValidatedData(req, res);
    if (!data) return;
    console.log("sent data:", data);
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
      data: [
        {
          id: `${Date.now()}`,
          role: data?.role ?? "user",
          email: data?.email ?? "testUser@email.co",
        },
      ],
    });
  };
}

export default AuthController;
