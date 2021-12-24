import express from "express";

import DailyLogController from "../controllers/dailyLogController";
import ExerciseController from "../controllers/exerciseController";
import GlobalController from "../controllers/globalController";
import Middlewares from "../middlewares";

class APIRouter {
  router = express.Router();
  exerciseController = new ExerciseController();
  dailyLogController = new DailyLogController();
  globalController = new GlobalController();
  constructor() {
    this.router.get(
      "/daily-log/:id",
      Middlewares.protectorMiddleware,
      this.dailyLogController.getDailyLogInfo
    );
    this.router.post(
      "/timer/time",
      Middlewares.protectorMiddleware,
      this.globalController.postAddTime
    );
    this.router.post(
      "/timer/meta",
      Middlewares.protectorMiddleware,
      this.globalController.exrMeta
    );
    this.router.post(
      "/timer/time/remove",
      Middlewares.protectorMiddleware,
      this.globalController.deleteExr
    );
    this.router.get(
      "/exercise/data",
      Middlewares.protectorMiddleware,
      this.exerciseController.getExerciseInfo
    );
  }
}

export default APIRouter;
