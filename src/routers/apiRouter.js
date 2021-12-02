import express from "express";

import DailyLogController from "../controllers/dailyLogController";
import ExerciseController from "../controllers/exerciseController";
import GlobalController from "../Controllers/globalController";

// const apiRouter = express.Router();

// apiRouter.get("/daily-log/:id", getDailyLogInfo);
// apiRouter.post("/timer/time", postAddTime);
// apiRouter.post("/timer/meta", exrMeta);
// apiRouter.post("/timer/time/remove", deleteExr);
// apiRouter.get("/exercise/data", getExerciseInfo);

class APIRouter {
  router = express.Router();
  exerciseController = new ExerciseController();
  dailyLogController = new DailyLogController();
  globalController = new GlobalController();
  constructor() {
    this.router.get("/daily-log/:id", this.dailyLogController.getDailyLogInfo);
    this.router.post("/timer/time", this.globalController.postAddTime);
    this.router.post("/timer/meta", this.globalController.exrMeta);
    this.router.post("/timer/time/remove", this.globalController.deleteExr);
    this.router.get("/exercise/data", this.exerciseController.getExerciseInfo);
  }
}

export default APIRouter;
