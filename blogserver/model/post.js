// import mongoose from "mongoose";

// const postSchema=mongoose.Schema({
//     title:{
//         type:String,
//         required:true,
//         unique:true
//     },
//     description:{
//         type:String,
//         required:true
//     },
//     picture:{
//         type:String,
//         required:true,
//     },
//     username:{
//         type:String,
//         required:true,
//     },
//     categories:{
//         type:String,
//         required:true,
//     },
//     createdDate:{
//         type:Date,
//     }
// })
// const post=mongoose.model('post',postSchema);
// export default post;
import mongoose from 'mongoose';

const PostSchema = mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    picture: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    categories: {
        type: Array,
        required: false   
    },
    createdDate: {
        type: Date
    }
},{
    timestamps: true
});


const Post = mongoose.model('Post', PostSchema);

export default Post;