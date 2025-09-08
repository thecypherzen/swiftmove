import express, { type Request, type Response } from "express";
import AuthController from "../controllers/AuthController.js";
import { body } from "express-validator";
import { StateController } from "../controllers/index.js";
import { isUUID } from "validator";

const stateController = new StateController();
const authController = new AuthController();
const {
  restrictAccess,
  validateLoginStatus,
  validateIsLoggedIn,
  validateSession,
} = authController.Middlewares;
const stateRouter = express.Router();

stateRouter.delete(
  ["/countries/:id"],
  validateSession,
  validateLoginStatus,
  validateIsLoggedIn,
  restrictAccess(["admin"]),
  stateController.delete
);

stateRouter.get(
  ["/countries/:id/states", "/countries/:id/states/:stateId"],
  validateSession,
  validateLoginStatus,
  validateIsLoggedIn,
  stateController.read
);

stateRouter.post(
  ["/countries/:id/states"],
  validateSession,
  validateLoginStatus,
  validateIsLoggedIn,
  restrictAccess(["admin"]),
  [
    body(["name", "nameCode", "countryId"])
      .trim()
      .notEmpty()
      .isString()
      .withMessage("expects string"),
    body().custom((value) => {
      const allowed = ["name", "nameCode", "countryId"];
      if (!allowed.includes(value)) {
        throw new Error(`Unknown value ${value}`);
      }
      if (value === "countryId" && !isUUID(value, "7")) {
        throw new Error("Invalid UUID");
      }
      return true;
    }),
  ],
  stateController.countryExists,
  stateController.create
);

stateRouter.put(
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
  stateController.update
);

// handle 404
stateRouter.use("/*", (_: Request, res: Response): void => {
  res.status(404).json({
    error: "Auth Resource Not Found",
  });
  return;
});
export default stateRouter;
