import express, { type Request, type Response } from "express";
import AuthController from "../controllers/AuthController.js";
import { body } from "express-validator";

const authController = new AuthController();
const authRouter = express.Router();

authRouter.post(["/login", "/signin"], authController.login);
authRouter.post(
  ["/", "/signup", "/register"],
  [
    body().notEmpty().withMessage("data required"),
    body("email")
      .notEmpty()
      .withMessage("required")
      .isEmail()
      .withMessage("invalid email"),
    body("role")
      .notEmpty()
      .withMessage("required")
      .isIn(["admin", "user"])
      .withMessage("invalid user role"),
    body("termsAccepted")
      .notEmpty()
      .withMessage("required")
      .isBoolean({ strict: true })
      .withMessage("invalid boolean"),
    body(["password"])
      .notEmpty()
      .withMessage("required")
      .isString()
      .withMessage("invalid string"),
  ],

  authController.createUser
);
// handle 404
authRouter.use("/*", (_: Request, res: Response): void => {
  res.status(404).json({
    error: "Auth Resource Not Found",
  });
  return;
});
export default authRouter;
