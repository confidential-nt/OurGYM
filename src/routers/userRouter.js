import express from "express";
import {
  getUserEdit,
  postUserEdit,
  userDelete,
} from "../controllers/userController";
import { avatarUpload } from "../middlewares";

const userRouter = express.Router();

userRouter.post("/delete", userDelete);
userRouter
  .route("/edit")
  .get(getUserEdit)
  .post(avatarUpload.single("profileImg"), postUserEdit);

export default userRouter;
