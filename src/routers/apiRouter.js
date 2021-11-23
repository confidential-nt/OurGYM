import express from "express";
import {  } from "../Controllers/globalController";

const apiRouter = express.Router();

apiRouter.post("/timer/time", registerView);

export default apiRouter;
