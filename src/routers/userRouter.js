import express from "express";
import { userDelete } from "../controllers/userController";

const userRouter = express.Router();

userRouter.post("/delete", userDelete);

export default userRouter;
