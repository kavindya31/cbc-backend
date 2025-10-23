import express from 'express';
import {getUsers,loginUser,saveUsers } from '../controller/userController.js';

const userRouter = express.Router();

userRouter.get("/",getUsers)
userRouter.post("/", saveUsers)
userRouter.post("/login",loginUser)
export default userRouter;


