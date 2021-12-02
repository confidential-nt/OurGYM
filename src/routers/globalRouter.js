import express from "express";
import GlobalController from "../controllers/globalController";
import UserController from "../controllers/userController";
import Middlewares from "../middlewares";

// const globalRouter = express.Router();

// globalRouter.route("/").get(getHome).post(postHome);
// globalRouter.route("/login").get(getLogin).post(postLogin);
// globalRouter.get("/logout", logout);
// globalRouter
//   .route("/join")
//   .get(getJoin)
//   .post(Middlewares.imgUpload.single("profileImg"), postJoin);
// globalRouter.get("/profile", profile);
// globalRouter.get("/stats", getStats);
// globalRouter.route("/ranking").get(getRanking).post(postRanking);

class GlobalRouter {
  router = express.Router();
  userController = new UserController();
  globalController = new GlobalController();
  constructor() {
    this.router
      .route("/")
      .get(this.globalController.getHome)
      .post(this.globalController.postHome);
    this.router
      .route("/login")
      .get(Middlewares.publicOnlyMiddleware, this.userController.getLogin)
      .post(Middlewares.publicOnlyMiddleware, this.userController.postLogin);
    this.router.get(
      "/logout",
      Middlewares.protectorMiddleware,
      this.userController.logout
    );
    this.router
      .route("/join")
      .get(Middlewares.publicOnlyMiddleware, this.userController.getJoin)
      .post(
        Middlewares.publicOnlyMiddleware,
        Middlewares.imgUpload.single("profileImg"),
        this.userController.postJoin
      );
    this.router.get(
      "/profile",
      Middlewares.protectorMiddleware,
      this.globalController.profile
    );
    this.router.get(
      "/stats",
      Middlewares.protectorMiddleware,
      this.globalController.getStats
    );
    this.router
      .route("/ranking")
      .get(Middlewares.protectorMiddleware, this.globalController.getRanking)
      .post(Middlewares.protectorMiddleware, this.globalController.postRanking);
  }
}

export default GlobalRouter;
