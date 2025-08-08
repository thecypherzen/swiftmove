import express, { NextFunction, Request, Response } from "express";
import config from "./config.js";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();
const port = parseInt(config.SERVER_PORT as string);

app.use(
  cors({
    origin: ["http://localhost:5002", "http://0.0.0.0:5002"],
    credentials: true,
  })
);
// add global middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// add base prop to req for all requests
app.use((req: Request, _: Response, next: NextFunction) => {
  req.body.timestamp = new Date();
  req.body.auth = {
    strictMode: true,
    usingCredentials: false,
    isLoggedIn: false,
  };
  next();
});

app.use(["/status", "/health"], (_: Request, res: Response): void => {
  res.status(200).json({
    status: "OK",
  });
});

// handle 404
app.use("/*", (_: Request, res: Response): void => {
  res.status(404).json({
    error: "Resource not found",
  });
  return;
});

app.listen(port, "0.0.0.0", () => {
  console.log("Server listening on port", port);
});
