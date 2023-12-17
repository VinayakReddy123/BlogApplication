import express from "express";

import { signupUser,loginUser } from "../controllers/userController.js";
import { uploadImage } from "../controllers/imageController.js";
import upload from "../utils/upload.js";
const Router=express.Router();

Router.post('/signup',signupUser);
Router.post('/login',loginUser);
Router.post('/file/upload',upload.single('file'), uploadImage);


export default Router;
