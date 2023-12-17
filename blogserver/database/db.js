import mongoose from "mongoose";

const Connection=async ()=>{
    try{
       await mongoose.connect('mongodb://127.0.0.1:27017/blogusers' );
        console.log("MongoDB Connected Successfully...");
    }catch(err){
        console.log('Failed to connect to database',err);
    }
}
export default Connection;