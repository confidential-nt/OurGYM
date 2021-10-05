import express from "express";
import { home, profile, calender, group } from "../controllers/globalController";
import {
  getJoin,
  getLogin,
  logout,
  postJoin,
  postLogin,
} from "../controllers/userController";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.route("/login").get(getLogin).post(postLogin);
globalRouter.get("/logout", logout);
globalRouter.route("/join").get(getJoin).post(postJoin);
globalRouter.get("/profile", profile);
globalRouter.get("/calender", calender);
globalRouter.get("/group", group);
export default globalRouter;
