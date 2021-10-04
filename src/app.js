import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouter";
import mongoose from 'mongoose';

const app = express();

const logger = morgan("dev");

app.set("views", process.cwd() + "/src/views");
app.set("view engine", "pug");

app.use(logger);
app.use(express.urlencoded({ extended: true }));

app.use("/", globalRouter);

export default app;
