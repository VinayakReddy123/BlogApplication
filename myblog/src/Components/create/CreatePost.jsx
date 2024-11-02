import { Box,styled,FormControl,InputBase,Button,TextareaAutosize } from "@mui/material";
import Add from '@mui/icons-material/AddCircle';
import { useState,useEffect,useContext } from "react";
import {  useLocation ,useNavigate} from "react-router-dom";
import {DataContext} from "../../context/DataProvider";
import {API} from '../../Service/api';
import {Typography} from "@mui/material";
// only for html tags we use 'img' like this or else we dont use ' ';

const Error=styled(Typography)`
    font-size:30px;
    color:#ff6161;
    line-height:10px;
    font-weight:600;
    margin : auto;
`;

const Image=styled('img') ({
    width:'100%',
    height:'50vh',
    objectFit:'cover'
});
const Container=styled(Box)`
    margin: 50px 100px;
`
const StyledFormControl=styled(FormControl)`
    margin-top:10px;
    display:flex;
    flex-direction:row;  
    align-items:center; 
`
const InputTextField=styled(InputBase)`
    flex:1;  
    margin:0px 30px;
    font-size:25px;
`
const TextArea=styled(TextareaAutosize)`
    width:100%;
    margin-top:10px;
    font-size:15px;
    border:none;
    &:focus-visible{
        outline:none;
    }
`

const initialPost={
     title:'',
     description:'',
     picture:'',
     username:'',
     categories:'',
     createDate:new Date()
}

const CreatePost=()=>{
    // const [image,setImage]=useState('');
    const [error,setError]=useState('');
    const [post,setPost]=useState(initialPost);
    const [file,setFile]=useState('');
    const location=useLocation();
    const navigate=useNavigate();
    const {account}=useContext(DataContext);
    const url=post.picture ? post.picture : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80" ;
    useEffect(()=>{
        const getImage= async ()=>{
            if(file){
                const data=new FormData();
                data.append("name",file.name);
                data.append("file",file);

                // api call
               const response=await API.uploadFile(data);
              // console.log(response);
               //post.picture=response.data;
               setPost({...post , picture : response.data}) // using this line instead of above line so that image is uploaded in time
            } 
        }
        getImage();
        post.categories=location.search?.split('=')[1] || 'All';
        post.username=account.username;
    },[file]);


    const handleChange=(e)=>{
        setPost({
            ...post,[e.target.name]: e.target.value
        })
     }
     const savePost = async () => {
        try {
            let res = await API.createPost(post);
            if (res.isFailure) {
                setError("Post not saved");
            }
            if (res.isSuccess) {
                setError('');
                navigate('/');
            }
        } catch (error) {
            console.error("Error saving post:", error);
            setError("An error occurred while saving the post");
        }
    }
    
    
    return(
        <>
          <Container>
            <Image src={url}/>   
           <StyledFormControl>
                <label htmlFor="fileInput">
                   <Add fontSize="medium" />
                </label>
                <input type="file"
                 id="fileInput"
                 accept="image/"
                 encType="multipart/form-data"
                 style={{display:'none'}}
                 onChange={(e)=>setFile(e.target.files[0])} //setting files
                 />
                <InputTextField placeholder="Title" onChange={(e)=>handleChange(e)} name="title" />
                <Button variant="contained"onClick={()=>savePost()} >Publish</Button>
            </StyledFormControl>
            <TextArea 
                minRows={5}
                placeholder="Tell your story.."    
                name="description"
                onChange={(e)=>handleChange(e)}        
            />
          </Container>
          {error && <Error>{error}</Error>}
        </>
    )
}

export default CreatePost;