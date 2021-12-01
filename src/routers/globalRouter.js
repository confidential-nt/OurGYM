import express from "express";
import {
  getHome,
  postHome,
  profile,
  getStats,
  getRanking,
  postRanking,
} from "../controllers/globalController";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
} from "../controllers/userController";
import { imgUpload } from "../middlewares";

const globalRouter = express.Router();

globalRouter.route("/").get(getHome).post(postHome);
globalRouter.route("/login").get(getLogin).post(postLogin);
globalRouter.get("/logout", logout);
globalRouter
  .route("/join")
  .get(getJoin)
  .post(imgUpload.single("profileImg"), postJoin);
globalRouter.get("/profile", profile);
globalRouter.get("/stats", getStats);
globalRouter.route("/ranking").get(getRanking).post(postRanking);
export default globalRouter;
