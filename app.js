import express from "express";
import globalRouter from "./routers/globalRouter";

const app = express();

app.set("view engine", "pug");

app.use("/", globalRouter);

export default app;
