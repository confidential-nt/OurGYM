import express from "express";
import DailyLogController from "../controllers/dailyLogController";
import UserController from "../controllers/userController";
import Middlewares from "../middlewares";

// const userRouter = express.Router();

// userRouter.post("/delete", userDelete);
// userRouter
//   .route("/edit")
//   .get(getUserEdit)
//   .post(Middlewares.imgUpload.single("profileImg"), postUserEdit);
// userRouter
//   .route("/daily-log")
//   .get(getDailyLog)
//   .post(Middlewares.imgUpload.single("image"), postDailyLog);
// userRouter.get("/daily-log/:id/delete", deleteDailyLog);
// userRouter.post(
//   "/daily-log/:id/edit",
//   Middlewares.imgUpload.single("image"),
//   editDailyLog
// );

class UserRouter {
  router = express.Router();
  dailyLogController = new DailyLogController();
  userController = new UserController();
  constructor() {
    this.router.post(
      "/delete",
      Middlewares.protectorMiddleware,
      this.userController.userDelete
    );
    this.router
      .route("/edit")
      .all(Middlewares.protectorMiddleware)
      .get(this.userController.getUserEdit)
      .post(
        Middlewares.imgUpload.single("profileImg"),
        this.userController.postUserEdit
      );
    this.router
      .route("/daily-log")
      .all(Middlewares.protectorMiddleware)
      .get(this.dailyLogController.getDailyLog)
      .post(
        Middlewares.imgUpload.single("image"),
        this.dailyLogController.postDailyLog
      );
    this.router.get(
      "/daily-log/:id/delete",
      Middlewares.protectorMiddleware,
      this.dailyLogController.deleteDailyLog
    );
    this.router.post(
      "/daily-log/:id/edit",
      Middlewares.protectorMiddleware,
      Middlewares.imgUpload.single("image"),
      this.dailyLogController.editDailyLog
    );
  }
}

export default UserRouter;
