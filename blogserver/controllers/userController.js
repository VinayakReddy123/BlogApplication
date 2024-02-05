import User from "../model/user.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import token from "../model/token.js";

dotenv.config();

export const signupUser=async (req,res)=>{
    try{
       const salt=await bcrypt.genSalt();
       const hashedPassword=await bcrypt.hash(req.body.password,salt);


       const user={
            name:req.body.name,
            username:req.body.username,
            password:hashedPassword 
       }
       const newuser=new User(user);
       await newuser.save();
       return res.status(200).json({msg:'signup succesful'});
    }catch(err){
        res.status(500).json({msg:'Unable to Signup user'});
    }
} 

export const loginUser=async (req,res)=>{
    let user=await User.findOne({username:req.body.username});
    if(!user){
        return res.status(400).json({msg:"User not found "});
    }
    try{
       let match=await bcrypt.compare(req.body.password,user.password);
       if(match){
          const accessToken=jwt.sign(user.toJSON(),process.env.ACCESS_SECRET_KEY,{expiresIn:'15m'});
          const refreshToken=jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY);
          const newToken=new token({token:refreshToken});
          newToken.save();
          return res.status(200).json({accessToken:accessToken,refreshToken:refreshToken,name:user.name,username:user.username});
       }else{
        return res.status(400).json({msg:"Wrong credentials provided"});
       }
    }catch(err){
        return res.status(500).json({msg:'Error while login in user'});
    }
}