
import { useState,useContext,useEffect } from "react";
import { Box,TextareaAutosize,Button, styled } from "@mui/material";
import { DataContext } from "../../../context/DataProvider";
import { API } from "../../../Service/api";
import Comment from "./Comment";
const Container=styled(Box)`
    margin-top:100px;
    display:flex;
`;
const Image=styled('img')({
    width:50,
    height:50,
    borderRadius:'50%'
});

const StyledTextArea=styled(TextareaAutosize)`
   height:100px;
   width:100%;
   margin:0px 20px;
`;

const initialValues={
    name:'',
    postId:'',
    comments:'',
    date:new Date(),
}
export const Comments=({post})=>{
  const [toggle,setToggle]=useState(false);
    const [comment,setComment]=useState(initialValues);
    const [comments,setComments]=useState([]);
    const url = 'https://static.thenounproject.com/png/12017-200.png';
    const {account}=useContext(DataContext);
     const handleChange=(e)=>{
        setComment({...comment,
            name:account.username,
            postId:post._id,
            comments:e.target.value
        });
     }
     const addComment=async (e)=>{
         let res=await API.newComment(comment);
         if(res.isSuccess){
            setComment(initialValues);
         }
         setToggle(prevState=>!prevState);
     }
     useEffect(() => {
        const getData = async () => {
           try {
             let res = await API.getAllComments(post._id);
             setComments(res.data);
           } catch (error) {
             console.log(error);
           }
        };
        getData();
       }, [post,toggle]);


    return(
        <>
          <Container>
            <Image src={url} />
            <StyledTextArea 
               minRows={5}
               placeholder="Whats on your mind"
               value={comment.comments}
               onChange={(e)=>handleChange(e)}
             />
             <Button variant="contained"
              size="medium" 
              onClick={(e)=>addComment(e)}
             style={{height:40}}>Post</Button> 
          </Container>
          <Box>
              {
                comments && comments.length>0 && comments.map(comment=>(
                    <Comment comment={comment} setToggle={setToggle} />
                ))
              }
          </Box>
        </>
    )
}

export default Comments;