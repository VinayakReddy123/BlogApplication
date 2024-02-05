import express from "express";

import { signupUser,loginUser } from "../controllers/userController.js";
import { uploadImage ,getImage} from "../controllers/imageController.js";
import { createPost,getAllPosts ,getPost,updatePost,deletePost} from "../controllers/post-controller.js";
import { newComment,getComment,deleteComment } from "../controllers/commentsController.js";
import upload from "../utils/upload.js";
import { authenticateToken } from "../controllers/jwt-controller.js";
const Router=express.Router();

Router.post('/signup',signupUser);
Router.post('/login',loginUser);
Router.post('/file/upload',upload.single('file'), uploadImage);
Router.get('/file/:filename',getImage);
Router.post('/create',authenticateToken,createPost);
Router.get('/posts',authenticateToken,getAllPosts);
Router.get('/post/:id',authenticateToken,getPost);
Router.put('/update/:id',authenticateToken,updatePost);
Router.delete('/delete/:id',authenticateToken,deletePost);
Router.post('/comment/new',authenticateToken,newComment);
Router.get('/comments/:id',authenticateToken,getComment);
Router.delete('/comment/delete/:id',authenticateToken,deleteComment)

export default Router;
