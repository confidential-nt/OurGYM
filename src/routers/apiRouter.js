import express from "express";
import { getDailyLogInfo } from "../controllers/dailyLogController";
import {} from "../Controllers/globalController";

const apiRouter = express.Router();

apiRouter.get("/daily-log/:id", getDailyLogInfo);

export default apiRouter;
