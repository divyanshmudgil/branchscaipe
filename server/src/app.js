import express from "express";
import cors from "cors";
import morgan from "morgan";
import { config } from "./config/env.js";
import { chatRouter } from "./routes/chat.routes.js";
import { notFound } from "./middleware/notFound.js";
import { errorHandler } from "./middleware/errorHandler.js";

export const app = express();

app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev"));
app.use(cors({ origin: config.corsOrigin }));
app.use(express.json({ limit: "1mb" }));

app.get("/health", (req, res) => res.json({ ok: true }));

app.use("/api", chatRouter);

app.use(notFound);
app.use(errorHandler);
