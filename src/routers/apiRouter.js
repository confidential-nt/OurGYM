import express from "express";

import { getDailyLogInfo } from "../controllers/dailyLogController";
import { postAddTime, deleteExr ,exrMeta} from "../Controllers/globalController";

const apiRouter = express.Router();

apiRouter.get("/daily-log/:id", getDailyLogInfo);
apiRouter.post("/timer/time", postAddTime);
apiRouter.post("/timer/meta", exrMeta);
apiRouter.post("/timer/time/remove", deleteExr);
// apiRouter.post("/timer/meta/remove", deleteExrMeta);
// apiRouter.get("/exercise/data", getExerciseInfo);

export default apiRouter;
