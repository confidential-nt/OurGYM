import express from "express";

import { getDailyLogInfo } from "../controllers/dailyLogController";
import { addTime, deleteExr } from "../Controllers/globalController";

const apiRouter = express.Router();

apiRouter.get("/daily-log/:id", getDailyLogInfo);
apiRouter.post("/timer/time", addTime);
apiRouter.post("/timer/time/remove", deleteExr);

export default apiRouter;