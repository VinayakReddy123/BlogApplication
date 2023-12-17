import express from "express";
import Connection from "./database/db.js";
import Router from "./routes/route.js";
import cors from "cors";
import bodyParser from "body-parser";
const app=express();

app.use(cors());
app.use(bodyParser.json({extended:true}));
app.use(bodyParser.urlencoded({extended:true}))
app.use('/',Router);
const port=8000;


app.listen(port,(err)=>{
    if(err){
      return;
    } 
    console.log("Server is running on port ",port);
})
Connection();