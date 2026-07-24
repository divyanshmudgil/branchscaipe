import { Router } from "express";
import { streamChat } from "../controllers/chat.controller.js";

export const chatRouter = Router();

chatRouter.post("/chat", streamChat);
