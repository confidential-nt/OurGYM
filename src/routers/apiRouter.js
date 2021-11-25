import express from "express";
import { addTime } from "../Controllers/globalController";

const apiRouter = express.Router();

apiRouter.post("/timer/time", addTime);

export default apiRouter;