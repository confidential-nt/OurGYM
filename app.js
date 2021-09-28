import express from "express";
import globalRouter from "./routers/globalRouter";

const app = express();

app.use("/", globalRouter);

export default app;
