import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";

const app = express();

const logger = morgan("dev");

app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");

app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use("/static", express.static("assets"));
app.use("/", globalRouter);

export default app;
