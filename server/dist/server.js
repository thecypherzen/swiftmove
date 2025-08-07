import express from "express";
import config from "./config.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const app = express();
const port = parseInt(config.SERVER_PORT) || 8083;
app.use(cors({
    origin: ["http://localhost:5002", "http://0.0.0.0:5002"],
    credentials: true,
}));
// add global middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
// add base prop to req for all requests
app.use((req, _, next) => {
    req.body.timestamp = new Date();
    req.body.auth = {
        strictMode: true,
        usingCredentials: false,
        isLoggedIn: false,
    };
    next();
});
app.use(["/status", "/health"], (_, res) => {
    res.status(200).json({
        status: "OK",
    });
});
// handle 404
app.use("/*", (_, res) => {
    res.status(404).json({
        error: "Resource not found",
    });
    return;
});
app.listen(port, "0.0.0.0", () => {
    console.log("Server listening on port", port);
});
//# sourceMappingURL=server.js.map