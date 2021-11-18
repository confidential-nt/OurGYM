import express from "express";
import {
  getHome,
  postHome,
  profile,
  getStats,
  ranking,
} from "../controllers/globalController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
} from "../controllers/userController";
import { avatarUpload } from "../middlewares";

const globalRouter = express.Router();

globalRouter.route("/").get(getHome).post(postHome);
globalRouter.route("/login").get(getLogin).post(postLogin);
globalRouter.get("/logout", logout);
globalRouter
  .route("/join")
  .get(getJoin)
  .post(avatarUpload.single("profileImg"), postJoin);
globalRouter.get("/profile", profile);
globalRouter.get("/stats", getStats);
globalRouter.get("/ranking", ranking);
export default globalRouter;
