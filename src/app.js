import express from "express";
import globalRouter from "./routers/globalRouter";

const app = express();

app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true }));

app.use("/", globalRouter);

export default app;
