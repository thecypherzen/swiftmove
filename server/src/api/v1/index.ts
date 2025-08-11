import express, { type Request, type Response } from "express";
import authRouter from "./routes/auth.js";

const v1Router = express.Router();

v1Router.use(["/status", "/health"], (_: Request, res: Response): void => {
  res.status(200).json({
    apiVersion: 1,
    status: "OK",
  });
});

v1Router.use("/auth", authRouter);

export default v1Router;
