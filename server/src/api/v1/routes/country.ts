import express, { type Request, type Response } from "express";
import AuthController from "../controllers/AuthController.js";
import { body } from "express-validator";
import { CountryController } from "../controllers/index.js";

const countryController = new CountryController();
const authController = new AuthController();
const {
  restrictAccess,
  validateLoginStatus,
  validateIsLoggedIn,
  validateSession,
} = authController.Middlewares;
const countryRouter = express.Router();

countryRouter.delete(
  ["/countries/:id"],
  validateSession,
  validateLoginStatus,
  validateIsLoggedIn,
  restrictAccess(["admin"]),
  countryController.delete
);

countryRouter.get(
  ["/countries", "/countries/:id"],
  validateSession,
  validateLoginStatus,
  validateIsLoggedIn,
  countryController.read
);

countryRouter.post(
  ["/countries"],
  validateSession,
  validateLoginStatus,
  validateIsLoggedIn,
  restrictAccess(["admin"]),
  [
    body(["name", "nameCode", "phoneCode"])
      .trim()
      .notEmpty()
      .isString()
      .withMessage("expects string"),
    body().custom((value) => {
      const allowed = ["name", "nameCode", "phoneCode"];
      if (!allowed.includes(value)) {
        throw new Error(`Unknown value ${value}`);
      }
      return true;
    }),
  ],
  countryController.create
);

countryRouter.put(
  ["/countries/:id"],
  validateSession,
  validateLoginStatus,
  validateIsLoggedIn,
  restrictAccess(["admin"]),
  [
    body().notEmpty().withMessage("data required"),
    body().custom((value) => {
      const allowed = ["name", "nameCode", "phoneCode"];
      if (!allowed.includes(value)) {
        throw new Error(`Unknown value ${value}`);
      }
      return true;
    }),
  ],
  countryController.update
);

// handle 404
countryRouter.use("/*", (_: Request, res: Response): void => {
  res.status(404).json({
    error: "Auth Resource Not Found",
  });
  return;
});
export default countryRouter;
