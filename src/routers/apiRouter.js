import express from "express";

import { getDailyLogInfo } from "../controllers/dailyLogController";
import { addTime, deleteExr ,exrMeta} from "../Controllers/globalController";

const apiRouter = express.Router();

apiRouter.get("/daily-log/:id", getDailyLogInfo);
apiRouter.post("/timer/time", addTime);
apiRouter.post("/timer/meta", exrMeta);
apiRouter.post("/timer/time/remove", deleteExr);
apiRouter.get("/exercise/data", getExerciseInfo);

export default apiRouter;
