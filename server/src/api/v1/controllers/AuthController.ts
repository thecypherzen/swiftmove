import { BaseController } from "./BaseController.js";
import { type Request, type Response } from "express";

class AuthController extends BaseController {
  constructor() {
    super();
  }
  async login(req: Request, res: Response) {
    const data = req.body;
    res.status(201).json({
      errno: 0,
      status: "success",
      data: [
        {
          id: `${Date.now()}`,
          role: data?.role ?? "user",
          email: data?.email ?? "testUser@email.co",
        },
      ],
    });
  }
}

export default AuthController;
