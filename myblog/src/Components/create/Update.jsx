import { Box,styled,FormControl,InputBase,Button,TextareaAutosize } from "@mui/material";
import Add from '@mui/icons-material/AddCircle';
import { useState,useEffect,useContext } from "react";
import {  useLocation ,useNavigate,useParams} from "react-router-dom";
import {DataContext} from "../../context/DataProvider";
import {API} from '../../Service/api'
// only for html tags we use 'img' like this or else we dont use ' ';
const Image=styled('img') ({
    width:'100%',
    height:'50vh',
    objectFit:'cover'
});
const Container = styled(Box)(({ theme }) => ({
    margin: '50px 100px',
    [theme.breakpoints.down('md')]: {
      margin: 0
    }
  }));
  
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

const Update=()=>{
    // const [image,setImage]=useState('');
    const [post,setPost]=useState(initialPost);
    const [file,setFile]=useState('');
    const location=useLocation();
    const navigate=useNavigate();
    const {account}=useContext(DataContext);
    const url=post.picture ? post.picture : "https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80";
    const {id}=useParams();
    useEffect(()=>{
        const fetchData=async ()=>{
            let res=await API.getPostById(id);
            if(res.isSuccess){
                setPost(res.data);
            }
        }
        fetchData();
    },[])


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
    const updateBlogPost=async ()=>{
       let res=await API.updatePost(post);
       if(res.isSuccess){
           navigate(`/details/${id}`);
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
                <InputTextField placeholder="Title" value={post.title} onChange={(e)=>handleChange(e)} name="title" />
                <Button variant="contained"onClick={()=>updateBlogPost()} >Update</Button>
            </StyledFormControl>
            <TextArea 
                minRows={5}
                placeholder="Tell your story.."    
                name="description"
                onChange={(e)=>handleChange(e)}    
                value={post.description}    
            />
          </Container>
        </>
    )
}

export default Update;