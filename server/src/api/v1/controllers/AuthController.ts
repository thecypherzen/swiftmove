import { BaseController } from "./BaseController.js";
import { type Request, type Response } from "express";

class AuthController extends BaseController {
  constructor() {
    super();
  }
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
