import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import session from "express-session";
import MongoStore from "connect-mongo";
import { localsMiddleare } from "./middlewares";

const app = express();

const logger = morgan("dev");

app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");

app.use(logger);
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: "sdasdajksdhuiwhdaksdh",
    resave: true,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/ourgym" }),
  })
);

app.use(localsMiddleare);

app.use("/static", express.static("assets"));
app.use("/", globalRouter);

export default app;
