import express, { type Request, type Response } from "express";
import AuthController from "../controllers/AuthController.js";

const authController = new AuthController();
const authRouter = express.Router();

authRouter.post("/login", authController.login);
// handle 404
authRouter.use("/*", (_: Request, res: Response): void => {
  res.status(404).json({
    error: "Auth Resource Not Found",
  });
  return;
});
export default authRouter;
