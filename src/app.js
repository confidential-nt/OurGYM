import express from "express";
import morgan from "morgan";
import session from "express-session";
import MongoStore from "connect-mongo";
import Middlewares from "./middlewares";
import UserRouter from "./routers/userRouter";
import APIRouter from "./routers/apiRouter";
import GlobalRouter from "./routers/globalRouter";
import flash from "express-flash";

// const app = express();

// const logger = morgan("dev");

// app.set("views", process.cwd() + "/src/views");
// app.set("view engine", "pug");

// app.use(logger);
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(
//   session({
//     secret: process.env.COOKIE_SECRET,
//     resave: true,
//     saveUninitialized: false,
//     store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
//   })
// );

// app.use(localsMiddleare);

// app.use("/static", express.static("assets"));
// app.use("/uploads", express.static("uploads"));
// app.use("/", globalRouter);
// app.use("/users", userRouter);
// app.use("/api", apiRouter);

class App {
  app = express();
  userRouter = new UserRouter();
  globalRouter = new GlobalRouter();
  apiRouter = new APIRouter();
  constructor() {
    const logger = morgan("dev");

    this.app.set("views", process.cwd() + "/src/views");
    this.app.set("view engine", "pug");

    this.app.use(logger);
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
    this.app.use(
      session({
        secret: process.env.COOKIE_SECRET,
        resave: true,
        saveUninitialized: false,
        store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
      })
    );
    this.app.use(flash());
    this.app.use(Middlewares.localsMiddleare);

    this.app.use("/static", express.static("assets"));
    this.app.use("/uploads", express.static("uploads"));
    this.app.use("/", this.globalRouter.router);
    this.app.use("/users", this.userRouter.router);
    this.app.use("/api", this.apiRouter.router);
  }
}

export default App;
