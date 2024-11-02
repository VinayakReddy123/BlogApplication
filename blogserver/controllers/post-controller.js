
import Post from "../model/post.js";

export const createPost=async (req,res)=>{
   
    try{
      if (!req.body || !req.body.title || !req.body.description) {
         return res.status(400).json({msg: "Title and content are required"});
      }
       const post=await new Post(req.body);
       post.save();
       return res.status(200).json('Post saved succesfully');
    }catch(err){
       return res.status(500).json({msg:"post not saved"});
    } 
}

export const getAllPosts=async (req,res)=>{
   let category=req.query.category;
   console.log("Inside posts ss");
   let posts;
      try{
         if(category){
            posts=await Post.find({categories:category })
         }else{
            posts=await Post.find({});
         }
          
          return res.status(200).json(posts);
      }catch(err){
         return res.status(500).json({msg:err.message});
      }
}

export const getPost=async (req,res)=>{
   try{
      const post=await Post.findById(req.params.id);
      return  res.status(200).json(post);
   }catch(err){
      return res.status(500).json({msg:"canot get post"});
   }
}

export const updatePost=async(req,res)=>{
   try{
      const post=await Post.findById(req.params.id);
      if(!post){
         return res.status(404).json({msg:'No post found'});
      }
      await Post.findByIdAndUpdate(req.params.id,{$set:req.body}); // $set,$addtoset
      return res.status(200).json({msg:'Updated Successfully'})
   }catch(err){
      return res.status(500).json({err:err.message});
   }
}


export const deletePost=async (req,res)=>{
   console.log("About to delete");
   try{
      const post=await Post.findById(req.params.id);
      
      if(!post){
        return res.status(404).json({msg:'No post with this id!'});
      }
      
      await Post.findByIdAndDelete(post._id);
      
      return res.status(200).json({msg:"post deleted succesfully"});
   }catch(err){
     return res.status(500).json({msg:"Cant delete post"});
   }
}