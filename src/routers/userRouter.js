import express from "express";
import {
  deleteDailyLog,
  editDailyLog,
  getDailyLog,
  postDailyLog,
} from "../controllers/dailyLogController";
import {
  getUserEdit,
  postUserEdit,
  userDelete,
} from "../controllers/userController";
import { imgUpload } from "../middlewares";

const userRouter = express.Router();

userRouter.post("/delete", userDelete);
userRouter
  .route("/edit")
  .get(getUserEdit)
  .post(imgUpload.single("profileImg"), postUserEdit);
userRouter
  .route("/daily-log")
  .get(getDailyLog)
  .post(imgUpload.single("image"), postDailyLog);
userRouter.get("/daily-log/:id/delete", deleteDailyLog);
userRouter.post("/daily-log/:id/edit", imgUpload.single("image"), editDailyLog);

export default userRouter;
