import express from "express";
import { home, join, login } from "../controllers/globalController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/login", login);
globalRouter.get("/join", join);

export default globalRouter;
