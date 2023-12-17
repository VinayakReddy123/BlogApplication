import { Box,styled,FormControl,InputBase,Button,TextareaAutosize } from "@mui/material";
import Add from '@mui/icons-material/AddCircle';
import { useState,useEffect,useContext } from "react";
import {  useLocation } from "react-router-dom";
import {DataContext} from "../../context/DataProvider";
import {API} from '../../Service/api'
// only for html tags we use 'img' like this or else we dont use ' ';
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
    const [post,setPost]=useState(initialPost);
    const [file,setFile]=useState('');
    const location=useLocation();
    const {account}=useContext(DataContext);
    const url=post.picture ? post.picture : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
    useEffect(()=>{
        const getImage= async ()=>{
            if(file){
                const data=new FormData();
                data.append("name",file.name);
                data.append("file",file);

                // api call
               const response=await API.uploadFile(data);
               post.picture=response.data;
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
                 enctype="multipart/form-data"
                 style={{display:'none'}}
                 onChange={(e)=>setFile(e.target.files[0])} //setting files
                 />
                <InputTextField placeholder="Title" onChange={(e)=>handleChange(e)} name="title" />
                <Button variant="contained" >Publish</Button>
            </StyledFormControl>
            <TextArea 
                minRows={5}
                placeholder="Tell your story.."    
                name="description"
                onChange={(e)=>handleChange(e)}        
            />
          </Container>
        </>
    )
}

export default CreatePost;