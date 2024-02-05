
import Comment from "../model/comment.js"
export const newComment=async (req,res)=>{
    try{
        const comment=await new Comment(req.body);
        comment.save();
        res.status(200).json({msg:"comment created succesfully"});
    }catch(err){
        if(err){
            res.status(401).send({message: 'Error al crear el comentario'})
        }
    }
}

export const getComment=async (req,res)=>{
    try{
       const comments=await Comment.find({postId:req.params.id});
      //console.log(comments)
       return res.status(200).json(comments);
    }catch(err){
        return res.status(500).json({msg:"cant get comments"});
    }
}

export const deleteComment = async (req, res) => {
    try {
       const comment = await Comment.findById(req.params.id);
   
       if (!comment) {
         return res.status(404).json({ msg: "cant find comment" });
       }
   
       //console.log("about to delete");
       await Comment.findByIdAndDelete(comment._id);
       return res.status(200).json({ msg: "comment deleted succesfully" });
    } catch (err) {
       return res.status(400).json({ msg: "cant delete comment" });
    }
};