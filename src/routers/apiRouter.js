import express from "express";

import { getDailyLogInfo } from "../controllers/dailyLogController";
import { addTime } from "../Controllers/globalController";

const apiRouter = express.Router();

apiRouter.get("/daily-log/:id", getDailyLogInfo);
apiRouter.post("/timer/time", addTime);

export default apiRouter;